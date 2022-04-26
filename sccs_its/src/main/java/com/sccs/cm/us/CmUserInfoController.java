package com.sccs.cm.us;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.sys.cmmn.util.MessageUtil;
import com.sccs.cm.sys.cmmn.util.aria.AriaUtil;
import com.sccs.cm.us.services.CmUserInfoSVC;

/**
 * 사용자 정보 관리
 * @author syoh
 */
@Controller
@RequestMapping("/com/sccs/cm/us")
public class CmUserInfoController {

	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * CmUserInfoSVC
	 */
	@Autowired
	CmUserInfoSVC cmUserInfoSVC;
	
	@RequestMapping("/init.do")
	public View sample(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/cm/us/PUI_CM_039_01-02-01.clx");
	}
	
	@RequestMapping("/selectDuplicationByUserId.do")	
	public View selectDuplicationByUserId(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception{
		Map<String, String> dmMsg = new HashMap<String, String>();
		Map<String, String> reqParam = new HashMap<String, String>();
		
		ParameterGroup param = dataRequest.getParameterGroup("dmParam");
		reqParam = param.getAllRows().next().toMap();
		
		String result = "";
		result = cmUserInfoSVC.selectDuplicationByUserId(reqParam.get("USER_ID") != null ? reqParam.get("USER_ID") : "");
		reqParam.put("duplicationYn", result);
		
		if("Y".equals(result)) {
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_US_E001"));
		} else {
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_US_M001"));
		}
		
		dataRequest.setResponse("dmParam", reqParam);
		dataRequest.setResponse("dm_msg", dmMsg);
		return new JSONDataView();
	}
	
	@RequestMapping("/createCmUserInfo.do")	
	public View createCmUserInfo(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception{
		Map<String, String> dmMsg = new HashMap<String, String>();
		Map<String, String> reqParam = new HashMap<String, String>();
		
		ParameterGroup param = dataRequest.getParameterGroup("dmParam");
		reqParam = param.getAllRows().next().toMap();
		reqParam.put("STTS_CD", "10");
		reqParam.put("REG_ID", reqParam.get("USER_ID"));
		reqParam.put("UPDT_ID", reqParam.get("USER_ID"));
		
		int result = 0;
		result = cmUserInfoSVC.insertCmUserInfo(reqParam);
		if(result > 0) {
			dmMsg.put("CODE", "S");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_REG_S001"));
		} else {
			dmMsg.put("CODE", "E");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_REG_E001"));
		}
		
		dataRequest.setResponse("dmParam", reqParam);
		dataRequest.setResponse("dm_msg", dmMsg);
		return new JSONDataView();
	}

}