package com.sy.controller;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Collection;

/**
 * User: Chandler
 * Date: 23/02/16
 */

public class BaseController {

    protected Logger logger = Logger.getLogger(this.getClass());

    protected Integer offset = 0;  //分组量

    protected Integer max = 20;     //分组最大条数


    protected void proPageParams(Integer page) {
        proPageParams(getRequest(), page);
    }

    protected HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }


    protected void proPageParams(HttpServletRequest request, Integer page) {
        Integer num = Integer.parseInt(request.getParameter("rows"));
        page = page < 1 ? 1 : page;
        setMax(Math.min(num, 100));
        setOffset(page == 1 ? 0 : (page - 1) * num);
    }

    protected void printJson(HttpServletResponse response, Collection data) {
        printJson(response, JSON.toJSONString(data));
    }

    protected void printJson(HttpServletResponse response, Object data) {
        printJson(response, JSON.toJSONString(data));
    }

    protected void printJson(HttpServletResponse response, String data) {
        response.setContentType("application/Json;charset=UTF-8");

        if (data == null) {
            data = "";
        }
        logger.debug("printJson:" + data);
        PrintWriter out = null;

        try {
            out = response.getWriter();
            out.write(data);
            out.flush();
        } catch (IOException e) {
            logger.error("Print output stream to client Error");
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    protected void printJson(HttpServletResponse response, String data,Long count){
        printJson(response,"{\"total\":" + count + ",\"rows\":" + data + "}");
    }

    protected void exportCsv(HttpServletRequest request, HttpServletResponse response, String data, String fileName) {
        try {
            fileName = this.convertFileName(request, fileName);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setContentType("application/csv;charset=gbk");
        PrintWriter out = null;

        try {
            out = response.getWriter();
            out.write(data);
            out.flush();
        } catch (IOException e) {
            logger.error("Print output stream to client Error");
        } finally {
            if (out != null) {
                out.close();
            }
        }
    }

    /**
     * @param fileName 文件名
     * @param data 输出数据
     */
    protected void exportTxt(HttpServletRequest request, HttpServletResponse response, String data, String fileName) {
        try {
            fileName = this.convertFileName(request, fileName);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.setContentType("text/plain;charset=gbk");
        PrintWriter out = null;

        try {
            out = response.getWriter();
            out.write(data);
            out.flush();
        } catch (IOException e) {
            logger.error("Print output stream to client Error");
        } finally {
            if (out != null) {
                out.close();
                data = null;//暗示gc来回收
            }
        }
    }


    private String convertFileName(HttpServletRequest request, String fileName) {
        String userAgent = request.getHeader("USER-AGENT");
        String finalFileName = "";
        try {

            if (userAgent.contains("MSIE")) {//IE浏览器
                finalFileName = URLEncoder.encode(fileName, "UTF8");
            } else if (userAgent.contains("Mozilla")) {//google,火狐浏览器
                finalFileName = new String(fileName.getBytes(), "ISO8859-1");
            } else {
                finalFileName = URLEncoder.encode(fileName, "UTF8");//其他浏览器
            }
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getMessage());
        }
        return finalFileName;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }
}
