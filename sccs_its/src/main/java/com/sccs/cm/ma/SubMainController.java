package com.sccs.cm.ma;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.mn.services.MenuSVC;
import com.sccs.cm.sys.cmmn.util.EgovUserDetailsHelper;

/**
 * Sub Main 페이지 컨트롤러
 * @author syoh
 */
@Controller
@RequestMapping("/com/sccs/cm/ma")
public class SubMainController {

	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * MenuService
	 */
	@Autowired
	MenuSVC menuSVC;
	
	@RequestMapping("/subMain.do")
	public View subMain(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		return new UIView("view/cm/ma/EXBApp.clx");
	}
	
	@RequestMapping("/roleMenuList.do")	
	public View menuList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();
		Map<String,Object> reqParam = new HashMap<String,Object>();
		List<Map<String,Object>> roleMenuList = null;
		
		if(isAuthenticated) {
			String authCd = EgovUserDetailsHelper.getAuthority();
			reqParam.put("ROLE_CD", authCd);
			roleMenuList = menuSVC.selectRoleMenuList(reqParam);
			
		}
		dataRequest.setResponse("ds_menu", roleMenuList);
		return new JSONDataView();
	}


}