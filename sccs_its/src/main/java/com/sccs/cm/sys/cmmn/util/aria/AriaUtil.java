package com.sccs.cm.sys.cmmn.util.aria;

import com.sccs.cm.sys.cmmn.util.EgovProperties;

public class AriaUtil {

	private static final String key = EgovProperties.getProperty("aria.sccs_its.key"); // 암복호화키

	//암호화 시작
	public static String setAriaecryptCmm(String param, String gbn) {
		if(param != null && !"".equals(param) && "ihidnum".equals(gbn)){
			param = param.substring(0, 7) + AriaUtil.setAriaecrypt(param.substring(7, 13));
		}else{
			param = AriaUtil.setAriaecrypt(param);
		}
		return param;
	}
	
	//암호화 -> 복호화
	public static String setAriadecryptChk(String param, String gbn) {
		if(param != null && !"".equals(param) && param.indexOf("[ARIA256]") > -1){
			if("ihidnum".equals(gbn)){
				param = param.substring(0, 7) + AriaUtil.setAriadecrypt(param.substring(7, param.length()));
			}else{
				param = AriaUtil.setAriadecrypt(param);
			}
		}
		return param;
	}
	
	public static String setAriaecrypt(String value) {
		return CryptARIA.encryptkey(value, key);
	}

	public static String setAriadecrypt(String value) {
		return CryptARIA.decryptkey(value, key);
	}
}
