package com.sccs.cm.mn;

import java.util.HashMap;
import java.util.Iterator;
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
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.mn.services.MenuRoleMappingSVC;
import com.sccs.cm.mn.services.MenuSVC;
import com.sccs.cm.sys.cmmn.util.MessageUtil;

/**
 * 메뉴 관리
 * @author syoh
 */
@Controller
@RequestMapping("/com/sccs/cm/mn")
public class MenuController {

	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * MenuService
	 */
	@Autowired
	MenuSVC menuSVC;
	
	/**
	 * MenuRoleMappingService
	 */
	@Autowired	
	MenuRoleMappingSVC menuRoleMappingSVC;
	
	@RequestMapping("/init.do")
	public View sample(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/cm/mn/PUI_CM_041_01-01.clx");
	}
	
	@RequestMapping("/menuList.do")	
	public View menuList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		List<Map<String,Object>> menuList = menuSVC.selectMenuList();
		dataRequest.setResponse("ds_menu", menuList);
		return new JSONDataView();
	}
	
	@RequestMapping("/selectMenuRoleList.do")	
	public View selectMenuRoleList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		Map<String, String> dm_menu = new HashMap<String, String>();
		
		ParameterGroup parameterGroup = dataRequest.getParameterGroup("dm_menu");
		Iterator<ParameterRow> parameterRow = parameterGroup.getAllRows();
		dm_menu = parameterRow.next().toMap();
		
		List<Map<String,Object>> menuRoleList = menuRoleMappingSVC.selectMenuMappingRoleList(dm_menu);

		dataRequest.setResponse("ds_roleList", menuRoleList);
		return new JSONDataView();
	}
	
	@RequestMapping("/saveMenu.do")	
	public View saveMenu(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception{
		Map<String, String> dmMsg = new HashMap<String, String>();
		Map<String, String> dmMenu = new HashMap<String, String>();
		
		ParameterGroup pGrpMenu = dataRequest.getParameterGroup("dm_menu");
		Iterator<ParameterRow> parameterRow = pGrpMenu.getAllRows();
		dmMenu = parameterRow.next().toMap();
		
		int result = 0;
		if("U".equals(dmMenu.get("SAVE_MODE") != null ? String.valueOf(dmMenu.get("SAVE_MODE")) : "")) {
			result = menuSVC.updateMenu(dataRequest);
			if(result > 0) {
				dmMsg.put("CODE", "S");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_UPD_S001"));
			} else {
				dmMsg.put("CODE", "E");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_UPD_E001"));
			}
		} else if("I".equals(dmMenu.get("SAVE_MODE") != null ? String.valueOf(dmMenu.get("SAVE_MODE")) : "")) {
			result = menuSVC.insertMenu(dataRequest);
			if(result > 0) {
				dmMsg.put("CODE", "S");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_REG_S001"));
			} else {
				dmMsg.put("CODE", "E");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_REG_E001"));
			}
		} else {
			result = menuSVC.deleteMenu(dataRequest);
			if(result > 0) {
				dmMsg.put("CODE", "S");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_DEL_S001"));
			} else {
				dmMsg.put("CODE", "E");
				dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_DEL_E001"));
			}
		}
		
		dataRequest.setResponse("dm_menu", dmMenu);
		dataRequest.setResponse("dm_msg", dmMsg);
		return new JSONDataView();
	}

}