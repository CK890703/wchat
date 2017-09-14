package com.sy.common.mq.listener;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.MessageProperties;
import org.apache.log4j.Logger;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.ChannelAwareMessageListener;


/**
 * Created by 杨成 on 2016/3/21.
 */
public abstract class BaseListener implements ChannelAwareMessageListener {

    public static String ERROR_QUEUE_SUFFIX = ".error" ;
    public static final String ERROR_MESSAGE_KEY="errorMsg";
    Logger logger = Logger.getLogger(BaseListener.class);

    enum Action {
        ACCEPT,  // 处理成功
        RETRY,   // 可以重试的错误
        REJECT,  // 无需重试的错误
    }

    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        Action action = Action.ACCEPT;
        try {
            processMessage(message, channel);
        } catch (Exception e) {
            if(e.getMessage().equals("RETRY")){
                action = Action.RETRY;
                return;
            }

            logger.error(e.getMessage(), e);
            try {
                addError(message, channel, e);
                action = Action.REJECT;
            } catch (Exception e2) {
                //TODO 此处需要记录持久化日志，因为此次异常已经无法解决了，要保证消息不丢失
                action = Action.RETRY;
                logger.error(e2.getMessage(), e2);
            }
        } finally {
            if (action == Action.ACCEPT) {
                channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
            } else if (action == Action.RETRY) {
                channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, true);
            } else {
                channel.basicNack(message.getMessageProperties().getDeliveryTag(), false, false);
            }

        }
    }

    /**
     * 发生异常时将消息存入错误消息队列
     * @param message
     * @param channel
     * @throws Exception
     */
    private void addError(Message message, Channel channel,Exception e) throws Exception{
        byte[] errorMsgBody = null;
        try{
            JSONObject jsonObj = JSON.parseObject(new String(message.getBody()));
            jsonObj.put(ERROR_MESSAGE_KEY,e.getMessage());
            errorMsgBody = jsonObj.toJSONString().getBytes();
        }catch(JSONException e1){
            logger.error("Original Message Body: "+new String(message.getBody()));
            e1.printStackTrace();
            errorMsgBody = message.getBody();
        }


        String queueName = message.getMessageProperties().getConsumerQueue() ;
        String errorQueueName = queueName + ERROR_QUEUE_SUFFIX ;

        channel.queueDeclare(errorQueueName, true, false, false, null) ;
        channel.basicPublish("", errorQueueName,
                MessageProperties.PERSISTENT_TEXT_PLAIN, errorMsgBody);
    }

    protected abstract void processMessage(Message message,Channel channel) throws Exception ;

}
