package com.sy.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;


public class ExcelUtil {
	
	/**
	 * 导出excel
	 * @param title  sheet页标题
	 * @param headers  第一行标题，一般中文名称
	 * @param columnNames  和headers对应属性名称
	 * @param mapList	数据
	 * @param out	文件流
	 */
	public static void exportExcel(String title, String[] headers,String[] columnNames,List<Map<String,Object>> mapList, OutputStream out) {
		// 声明一个工作簿
		HSSFWorkbook workbook = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = workbook.createSheet(title);
		// 设置表格默认列宽度为15个字符
		sheet.setDefaultColumnWidth(20);
		// 生成一个样式，用来设置标题样式
		HSSFCellStyle styleHeader = workbook.createCellStyle();
		// 设置这些样式
		styleHeader.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		styleHeader.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		styleHeader.setBorderRight(HSSFCellStyle.BORDER_THIN);
		styleHeader.setBorderTop(HSSFCellStyle.BORDER_THIN);
		styleHeader.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		styleHeader.setFont(font);
		
		// 生成一个样式，用来设置主体样式
		HSSFCellStyle styleBody = workbook.createCellStyle();
		// 设置这些样式
		styleBody.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		styleBody.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		styleBody.setBorderRight(HSSFCellStyle.BORDER_THIN);
		styleBody.setBorderTop(HSSFCellStyle.BORDER_THIN);
		styleBody.setAlignment(HSSFCellStyle.ALIGN_CENTER);					
					
		// 产生表格标题行
		HSSFRow row = sheet.createRow(0);
		for (int i = 0; i < headers.length; i++) {
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(styleHeader);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}
		for (int i = 0; i < mapList.size(); i++) {
			Map<String, Object> map = (Map<String, Object>) mapList.get(i);
			row = sheet.createRow(i + 1);
			if(null != columnNames&&columnNames.length>0){
				for(int j=0;j<columnNames.length;j++){
					HSSFCell cell = row.createCell(j);
					cell.setCellStyle(styleBody);
					Object v = map.get(columnNames[j]);
					cell.setCellValue(v==null?StringUtils.EMPTY:String.valueOf(map.get(columnNames[j])));
				}
			}
		}
		try {
			workbook.write(out);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 编码格式设置 防止文件名乱码
	 * @param useragent
	 * @param filename
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String fileDisposition(String useragent, String filename) throws UnsupportedEncodingException {
		String charset = "UTF-8";
		String userAgent = StringUtils.lowerCase(useragent);
		String new_filename = URLEncoder.encode(filename, charset);
		String str = "attachment; filename=" + URLEncoder.encode(filename, charset);
		if (StringUtils.isEmpty(userAgent)) {
			return str;
		}
		// IE浏览器
		if (userAgent.indexOf("msie") != -1) {
			
		}
		// Opera浏览器只能采用filename*
		else if (userAgent.indexOf("opera") != -1) {
			str = "attachment; filename*=UTF-8''" + new_filename;
		}
		// Safari浏览器，只能采用ISO编码的中文输出
		else if (userAgent.indexOf("safari") != -1) {
			str = "attachment; filename=" + new String(filename.getBytes("UTF-8"), "ISO8859-1");
		}
		// Chrome浏览器，只能采用MimeUtility编码或ISO编码的中文输出
		else if (userAgent.indexOf("applewebkit") != -1) {
			
		}
		// FireFox浏览器，可以使用MimeUtility或filename*或ISO编码的中文输出
		else if (userAgent.indexOf("mozilla") != -1) {
			str = "attachment; filename*=UTF-8''" + new_filename;
		}
		return str;
	}	
}
