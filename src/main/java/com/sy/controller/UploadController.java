package com.sy.controller;

import com.sy.service.UploadService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Controller
@RequestMapping("/upload")
public class UploadController {

    @Resource
    private UploadService uploadService;

    @RequestMapping(value = "/uploadfile", method = RequestMethod.GET)
    public String login() {
        return "uploadfile";
    }

    @ResponseBody
    @RequestMapping(value = "/fileupload")
    public void fileupload(HttpServletRequest request, HttpServletResponse response)  {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter pw = null;
        try{
            String result = uploadService.uploadSavefile(request);
            response.setContentType("text/html;charset=UTF-8");
            pw = response.getWriter();
            pw.write(result);
        }catch(Exception e){
            e.printStackTrace();
            pw.write("{\"status\", \"0\",\"message\", \"文件上传失败\"}");
        }finally{
            if(pw != null)
                pw.close();
        }
    }

}
