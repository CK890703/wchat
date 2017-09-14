package com.sy.util;


/** 
 * @ClassName: RandomUtil 
 * @Description: TODO(随即数的产生) 
 * @author gulijiang
 * @date 2012-4-19 上午9:58:51  
 */
public class RandomUtil {
	/**
	 * 验证码随机生成的序列基数
	 */
	private static char[] CHECKCODESEQUEBCE = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
		'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
		'X', 'Y', 'Z' , '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','i','l',
		's','t','u','v','w','x','y','z'}; 
	
	/**
	 * 密码随机生成的序列基数
	 */
	private static char[] PASSWORDSEQUEBCE = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
		'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
		'X', 'Y', 'Z' , '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'a','b','c','d','e','f','g','h','i', 'j','k','l', 'm','n','o','p','q','r','s',
		't','u','v','w','x','y','z'}; 
	/**
	 * 手机随机生成序列基数
	 */
	private static char[] PHONECODESEQUEBCE = {'0','1', '2', '3', '4', '5', '6', '7', '8', '9'};
	
	/**
	 * 说明:随便产生多少位的随即数
	 * @param codeCount 随即数的个数
	 * @param codeSequence  数组
	 * @return
	 */
	public static String getValidateCode(int codeCount, char []codeSequence){
		String randomCode = "";
		for (int i = 0; i < codeCount; i++) {
			randomCode+=codeSequence[(int) Math.floor(Math.random()*(codeSequence.length))];
		}
		return randomCode;
	}

	
	/**
	 * 生成随机密码
	 * @param n 密码位数
	 * @return
	 */
	public static String generatePassword(int n){ 
		return RandomUtil.getValidateCode(n, PASSWORDSEQUEBCE);
	}
	
	/**
	* @Title: generateValidateCode 
	* @Description: 随即生成n位验证码 
	* @param n 验证码的位数
	* @return String   验证码
	 */
	public static String generateValidateCode(int n){		
		return RandomUtil.getValidateCode(n,CHECKCODESEQUEBCE);
	}
	/**
	* @Title: generatePhoneCode 
	* @Description: 随即生成n位验证码 
	* @param n 验证码的位数
	* @return String   验证�?
	 */
	public static String generatePhoneCode(int n){		
		return RandomUtil.getValidateCode(n,PHONECODESEQUEBCE);
	}
	
	/**
	* @Title: generateRandomNumber 
	* @Description: 随即生成n位数字随机数
	* @param n 验证码的位数
	* @return String   验证�?
	 */
	public static String generateRandomNumber(int n){		
		return RandomUtil.getValidateCode(n,PHONECODESEQUEBCE);
	}
}
