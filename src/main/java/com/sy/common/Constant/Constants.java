package com.sy.common.Constant;

public class Constants {
	/**
	 * 系统常量
	 */
    public static interface SYS {
    	//默认密码
		public static final String DEFAULT_PASSWORD = "123456";
		//分页大小设置
		public static final int PAGESIZE = 15;
		// 用来保存当前登录用户信息的常量字符串
		public static final String WEB_USER_SESSION = "manage_user_logininfo";
		// 用来保存当前登录用户权限的常量字符串
		public static final String WEB_USERALLRIGHTS_SESSION = "userPermissions";
		// 返回JSON消息
		public static final String JSON_RESULT_MESSAGE = "message";
		// 返回JSON状态
		public static final String JSON_RESULT_ValidFORM_STATUS = "status";
		// 返回JSON状态码
		public static final String JSON_RESULT_STATUS_CODE = "statuscode";
		// 返回JSON数据
		public static final String JSON_RESULT_DATA = "data";
		// 返回JSON paging
		public static final String JSON_RESULT_PAGING = "paging";
		// 调用成功
		public static final String JSON_RESULT_MESSAGE_SUCCESS = "success";
		// 调用失败
		public static final String JSON_RESULT_MESSAGE_FAILURE = "fail";
		// 成功标识码
		public static final int OK = 10000;
		// 错误标识码
		public static final int ERROR = 20000;
	}

	/**
	 * 微信常量
	 */
	public static interface WX {

		//第三方用户唯一凭证
		public static final String APPID = "wx90a0420a2ad34a65";
		//第三方用户唯一凭证密钥，即appsecret
		public static final String SECRET = "afbe2c9723dba9e4763e8e457cea846f";
		//TOKEN
		public static final String TOKEN = "chenke890703";

		//获取access_token填写client_credential
		public static final String GRANT_TYPE = "client_credential";
		//获取access_token地址
		public static final String ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";

		//获取微信服务器IP地址
		public static final String CALLBACK_IP_URL = "https://api.weixin.qq.com/cgi-bin/getcallbackip";

		//获取公众号已创建的标签
		public static final String GET_TAGS_LIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/get";
		//创建用户标签
		public static final String CREATE_TAGS_URL = "https://api.weixin.qq.com/cgi-bin/tags/create";
		//编辑用户标签
		public static final String UPDATE_TAGS_URL = "https://api.weixin.qq.com/cgi-bin/tags/update";
		//删除用户标签
		public static final String DELETE_TAGS_URL = "https://api.weixin.qq.com/cgi-bin/tags/delete";
		//获取标签下粉丝列表
		public static final String GET_TAG_USER_LIST_URL = "https://api.weixin.qq.com/cgi-bin/user/tag/get";
		//批量为用户打标签
		public static final String BATCHTAGGING_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging";
		//批量为用户取消标签
		public static final String BATCHUNTAGGING_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging";
		//获取用户身上的标签列表
		public static final String GET_USER_TAGID_LIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/getidlist";

		//设置用户备注名
		public static final String UPDATE_REMARK_URL = "https://api.weixin.qq.com/cgi-bin/user/info/updateremark";
		//获取用户列表
		public static final String GET_USER_LIST_URL = "https://api.weixin.qq.com/cgi-bin/user/get";
		//获取用户基本信息(UnionID机制)
		public static final String GET_USER_INFO_URL = "https://api.weixin.qq.com/cgi-bin/user/info";
		//批量获取用户基本信息
		public static final String GET_USER_INFO_LIST_URL = "https://api.weixin.qq.com/cgi-bin/user/info/batchget";

		//获取公众号的黑名单列表
		public static final String GET_BLACKLIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist";
		//批量拉黑用户
		public static final String BATCHBLACKLIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist";
		//批量取消拉黑用户
		public static final String BATCHUNBLACKLIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist";

		//获取自定义菜单配置接口(官网和API创建)
		public static final String GET_CURRENT_SELFMENU_INFO_URL = "https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info";
		//自定义菜单查询接口(API创建，包含个性化菜单)
		public static final String GET_MENU_LIST_URL = "https://api.weixin.qq.com/cgi-bin/menu/get";
		//自定义菜单创建接口
		public static final String CREATE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/create";
		//自定义菜单删除接口(包含个性化菜单)
		public static final String DELETE_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/delete";

		//创建个性化菜单
		public static final String ADD_CONDITIONAL_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/addconditional";
		//删除个性化菜单
		public static final String DEL_CONDITIONAL_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/delconditional";
		//测试个性化菜单匹配结果
		public static final String TRYMATCH_MENU_URL = "https://api.weixin.qq.com/cgi-bin/menu/trymatch";




	}


}
