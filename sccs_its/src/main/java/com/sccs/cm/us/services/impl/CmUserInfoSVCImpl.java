package com.sccs.cm.us.services.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sccs.cm.sys.cmmn.services.CmDEM;
import com.sccs.cm.sys.cmmn.services.EgovFileScrty;
import com.sccs.cm.sys.cmmn.util.aria.AriaUtil;
import com.sccs.cm.us.services.CmUserInfoSVC;

/**
 * 사용자 정보 관리 서비스 구현 Class
 * @author syoh
 */
@Service
public class CmUserInfoSVCImpl implements CmUserInfoSVC {

	/**
	 * CmDEM
	 */
	@Autowired
	CmDEM cmDEM;
	
	@Override
	public String selectDuplicationByUserId(String userId) throws Exception {
		String result = "";
		result = (String)cmDEM.get("user.selectDuplicationByUserId", userId);
		return result;
	}
	
	@Override
	public int insertCmUserInfo(Map<String, String> reqParam) throws Exception {
		int result = 0;
		
		// 개인정보 양방향 암호화
		reqParam.put("IHIDNUM", AriaUtil.setAriaecryptCmm(reqParam.get("IHIDNUM"), "ihidnum"));
		reqParam.put("CTTPC", AriaUtil.setAriaecryptCmm(reqParam.get("CTTPC"), "etc"));
		reqParam.put("MBL_TELNO", AriaUtil.setAriaecryptCmm(reqParam.get("MBL_TELNO"), "etc"));
		reqParam.put("EML", AriaUtil.setAriaecryptCmm(reqParam.get("EML"), "etc"));
		
		// 비밀번호 단방향 암호화
		String encryptPassword = EgovFileScrty.encryptPassword(reqParam.get("PSWD"), reqParam.get("USER_ID"));
		reqParam.put("PSWD", encryptPassword);
		
		result = cmDEM.insert("user.insertCmUserInfo", reqParam);
		return result;
	}
}