package com.sy.util;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Created by 杨成 on 2016/2/29.
 * 简单调用redis，未集成至Spring boot，集成详见RedisConfig
 */
public final class RedisUtils {

        //Redis服务器IP
        private static String ADDR = "127.0.0.1";

        //Redis的端口号
        private static int PORT = 5857;

        //访问密码
        private static String AUTH = null;

        //可用连接实例的最大数目，默认值为8；
        //如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。
        private static int MAX_ACTIVE = 1024;

        //控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。
        private static int MAX_IDLE = 200;

        //等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；
        private static int MAX_WAIT = 10000;

        private static int TIMEOUT = 10000;

        //在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
        private static boolean TEST_ON_BORROW = true;

        private static JedisPool jedisPool = null;

        /**
         * 初始化Redis连接池
         */
        static {
            try {
                JedisPoolConfig config = new JedisPoolConfig();
                config.setMaxTotal(MAX_ACTIVE);
                config.setMaxIdle(MAX_IDLE);
                config.setMaxWaitMillis(MAX_WAIT);
                config.setTestOnBorrow(TEST_ON_BORROW);
                jedisPool = new JedisPool(config, ADDR, PORT, TIMEOUT, AUTH);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        /**
         * 获取Jedis实例
         * @return
         */
        public synchronized static Jedis getJedis() {
            try {
                if (jedisPool != null) {
                    Jedis resource = jedisPool.getResource();
                    return resource;
                } else {
                    return null;
                }
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
        }

        /**
         * 释放jedis资源
         * @param jedis
         */
        public static void returnResource(final Jedis jedis) {
            if (jedis != null) {
                jedisPool.returnResource(jedis);
            }
        }

//    public static void main(String[] args) {

        //连接 redis 服务

//        Jedis jedis = getJedis();


        //密码验证-如果你没有设置 redis 密码可不验证即可使用相关命令

//        jedis.auth(" abcdefg ");


        //简单的key-value 存储

//        jedis.set( "redis" ,  "myredis" );

//        System. out .println(jedis.hget("1453791161:reg:118000", "regtime"));


//        //在原有值得基础上添加,如若之前没有该key，则导入该key
//
//        //之前已经设定了 redis 对应" myredis ",此句执行便会使 redis 对应" myredisyourredis "
//
//        jedis.append( "redis" ,  "yourredis" );
//
//        jedis.append( "content" ,  "rabbit" );
//
//
//        // mset  是设置多个key-value值   参数（key1,value1,key2,value2,..., keyn , valuen ）
//
//        // mget  是获取多个key所对应的value值  参数（key1,key2,key3,..., keyn ）  返回的是个list
//
//        jedis.mset( "name1" , "yangw" , "name2" , "demon" , "name3" , "elena" );
//
//        System. out .println(jedis.mget( "name1" , "name2" , "name3" ));
//
//
//        //map
//
//        Map<String,String> user =  new HashMap<String,String>();
//
//        user.put( "name" ,  "cd" );
//
//        user.put( "password" ,  "123456" );
//
//        //map存入 redis
//
//        jedis.hmset( "user" , user);
//
//        // mapkey 个数
//
//        System. out .println(String. format ( "len:%d" , jedis.hlen( "user" )));
//
//        //map中的所有键值
//
//        System. out .println(String. format ( "keys: %s" , jedis.hkeys( "user" ) ));
//
//        //map中的所有value
//
//        System. out .println(String. format ( "values: %s" , jedis.hvals( "user" ) ));
//
//        //取出map中的name字段值
//
//        List<String> rsmap = jedis.hmget( "user" ,  "name" , "password" );
//
//        System. out .println(rsmap);
//
//        //删除map中的某一个键值 password
//
//        jedis.hdel( "user" ,  "password" );
//
//        System. out .println(jedis.hmget( "user" ,  "name" ,  "password" ));
//
//
//        //list
//
//        jedis.del( "listDemo" );
//
//        System. out .println(jedis.lrange( "listDemo" , 0, -1));
//
//        jedis.lpush( "listDemo" ,  "A" );
//
//        jedis.lpush( "listDemo" ,  "B" );
//
//        jedis.lpush( "listDemo" ,  "C" );
//
//        System. out .println(jedis.lrange( "listDemo" , 0, -1));
//
//        System. out .println(jedis.lrange( "listDemo" , 0, 1));
//
//
//        //set
//
//        jedis.sadd( "sname" ,  "wobby" );
//
//        jedis.sadd( "sname" ,  "kings" );
//
//        jedis.sadd( "sname" ,  "demon" );
//
//        System. out .println(String. format ( "set num: %d" , jedis.scard( "sname" )));
//
//        System. out .println(String. format ( "all members: %s" , jedis.smembers( "sname" )));
//
//        System. out .println(String. format ( "is member: %B" , jedis.sismember( "sname" ,  "wobby" )));
//
//        System. out .println(String. format ( "rand member: %s" , jedis.srandmember( "sname" )));
//
//        //删除一个对象
//        jedis.srem( "sname" ,  "demon" );
//
//        System. out .println(String. format ( "all members: %s" , jedis.smembers( "sname" )));

//    }
}
