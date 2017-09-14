package com.sy.service;

import com.sy.util.RandomUtil;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;

/**
 * 文件上传
 */

@Service
public class UploadService {
    Logger logger = Logger.getLogger(PubDictService.class);
    //常见图片格式：jpg,jpeg,png,bmp,gif
    private final static String imageformat[] = {"jpg","jpeg","png","bmp","gif","flv","swf"};
    //常见视频格式：wmv,asf,asx,rm, rmvb,mpg,mpeg,mpe,3gp,mov,mp4,m4v,avi,dat,mkv,flv,vob
    private final static String videoformat[] = {"wmv","asf","asx","rm", "rmvb","mpg","mpeg","mpe","3gp","mov","mp4","m4v","avi","dat","mkv","flv","vob"};

    @Value("${server.filepath}") String filepath;
    @Value("${server.fileserver}") String fileserver;
    public String uploadSavefile(HttpServletRequest request) {
        String pfiletype = request.getParameter("filetype");    //要求上传文件类型(image或者video)
        String pfileformat = request.getParameter("fileformat");//要求上传文件格式(例如:png 或者png,jpg)
        String pfileheight = request.getParameter("fileheight");//要求上传文件高度(不要带px)
        String pfilewidth = request.getParameter("filewidth");  //要求上传文件宽度(不要带px)
        String pfilesize = request.getParameter("filesize");    //要求上传文件大小(纯数字不要带单位,默认单位KB)
        String strResult = null;
        InputStream in = null;
        FileOutputStream fo = null;
        try {
            StandardMultipartHttpServletRequest req = (StandardMultipartHttpServletRequest) request;
            Iterator<String> iterator = req.getFileNames();
            while (iterator.hasNext()) {
                MultipartFile file = req.getFile(iterator.next());
                if(!file.isEmpty()){
                    //带后缀文件名
                    String suffixFileName = file.getOriginalFilename();
                    int split = suffixFileName.lastIndexOf(".");
                    //文件名
                    String fileName = suffixFileName.substring(0, split);
                    //文件格式
                    String fileformat = suffixFileName.substring(split + 1, suffixFileName.length()).toLowerCase();//全部转小写
                    //文件内容
                    //file.getBytes();
                    //文件MIME类型
                    //String mimeType = file.getContentType();
                    //时间戳
                    String timepath = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
                    //文件重新改名
                    suffixFileName = timepath + RandomUtil.generateRandomNumber(4) + "." + fileformat;
                    //文件路径
                    String path = null;
                    File pathfile = null;
                    //创建文件路径
                    if (StringUtils.isNotBlank(fileformat) && isFileFormat(imageformat, fileformat) || StringUtils.isNotBlank(pfiletype) && pfiletype.equals("image")) {//图片文件
                        String imagefilepath = "/files/image/" + timepath + "/";//图片文件路径
                        pathfile = new File(filepath + imagefilepath);
                        path = imagefilepath + suffixFileName;//全文件路径
                    } else if (StringUtils.isNotBlank(fileformat) && isFileFormat(videoformat, fileformat) || StringUtils.isNotBlank(pfiletype) && pfiletype.equals("video")) {//视频文件
                        String videofilepath = "/files/video/" + timepath + "/";//视频文件路径
                        pathfile = new File(filepath + videofilepath);
                        path = videofilepath + suffixFileName;//全文件路径
                    }
                    //对传参上传的处理(大小、格式、尺寸)
                    if(pathfile != null){
                        //创建时间戳文件夹
                        createFileDir(pathfile);
                        in = file.getInputStream();

                        //判断文件上传格式要求
                        if(StringUtils.isNotBlank(pfileformat)){
                            String[] arrayformat = pfileformat.split(",");
                            if (!isFileFormat(arrayformat, fileformat)) {
                                strResult = "{\"status\": \"0\",\"message\":\"上传的文件的格式必须是" + pfileformat + "\"}";
                                return strResult;
                            }
                        }

                        //判断文件上传大小要求
                        int filesize = in.available() / 1024;//字节数(KB)
                        if(StringUtils.isNotBlank(pfilesize)){
                            Integer pfilesizeint = Integer.valueOf(pfilesize);
                            if(pfilesizeint > 0 && filesize > pfilesizeint){
                                strResult = "{\"status\": \"0\",\"message\":\"上传的文件大小的不能大于" + pfilesizeint + "KB\"}";
                                return strResult;
                            }
                        }

                        //判断文件上传分辨率要求(只校验图片文件)
                        if(StringUtils.isNotBlank(pfilewidth) && StringUtils.isNotBlank(pfileheight)) {
                            if (StringUtils.isNotBlank(fileformat) && isFileFormat(imageformat, fileformat) || StringUtils.isNotBlank(pfiletype) && pfiletype.equals("image")) {//图片文件
                                Integer pfilewidthint = Integer.valueOf(pfilewidth);
                                Integer pfileheightint = Integer.valueOf(pfileheight);
                                if(pfilewidthint > 0 && pfileheightint > 0){
                                    BufferedImage image = ImageIO.read(in); //构造Image对象
                                    int imageWidth = image.getWidth();   //得到源图宽
                                    int imageHeight = image.getHeight(); //得到源图长
                                    if(imageWidth == pfilewidthint && imageHeight == pfileheightint){
                                        //存储文件
                                        fo = new FileOutputStream(filepath + path);
                                        ByteArrayOutputStream os = new ByteArrayOutputStream();
                                        ImageIO.write(image, fileformat, os);
                                        in = new ByteArrayInputStream(os.toByteArray());
                                        if(IOUtils.copyLarge(in, fo) > 0){
                                            strResult = "{\"status\": \"1\",\"message\": \"文件上传成功\",\"path\":\"" + fileserver + path + "\",\"filename\":\"" + fileName + "\"}";
                                            return strResult;
                                        }
                                    }else{
                                        strResult = "{\"status\": \"0\",\"message\":\"上传的文件的分辨率必须是" + pfilewidthint + "*" + pfileheightint + "px\"}";
                                        return strResult;
                                    }
                                }
                            }
                        }
                        //存储文件
                        fo = new FileOutputStream(filepath + path);
                        if(IOUtils.copyLarge(in, fo) > 0){
                            strResult = "{\"status\": \"1\",\"message\": \"文件上传成功\",\"path\":\"" + fileserver + path + "\",\"filename\":\"" + fileName + "\"}";
                            return strResult;
                        }
                    }
                } else {
                    strResult = "{\"status\": \"0\",\"message\":\"没找到待上传的文件\"}";
                    return strResult;
                }
            }
        } catch (IOException e) {
            strResult = "{\"status\": \"0\",\"message\":\"文件上传失败\"}";
            logger.error(e.getMessage());
            e.printStackTrace();
            return strResult;
        } finally {
            IOUtils.closeQuietly(in);
            IOUtils.closeQuietly(fo);
        }
        return strResult;
    }

    // 判断文件格式
    public boolean isFileFormat(String[] arr, String targetValue) {
        return Arrays.asList(arr).contains(targetValue);
    }

    // 判断文件是视频文件(mimeType)
    public boolean isVideo(String mimeType) {
        return (mimeType != null && mimeType.startsWith("video/"));
    }

    // 判断文件是图片文件(mimeType)
    public boolean isImage(String mimeType) {
        return (mimeType != null && mimeType.startsWith("image/"));
    }

    // 判断文件是音频文件(mimeType)
    public boolean isAudio(String mimeType) {
        return (mimeType != null && mimeType.startsWith("audio/"));
    }

    // 创建文件
    public static void createFile(File file) throws IOException {
        if (!file.exists()) {
            file.createNewFile();
        }
    }

    // 创建文件夹
    public static void createFileDir(File file) {
        if (!file.exists() && !file.isDirectory()) {
            file.mkdirs();
        }
    }

}
