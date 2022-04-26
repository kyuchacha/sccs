package com.sccs.cm.mn.services.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.sccs.cm.mn.services.MenuSVC;
import com.sccs.cm.sys.cmmn.services.CmDEM;

/**
 * 시스템 메뉴 서비스
 * @author syoh
 */
@Service
public class MenuSVCImpl implements MenuSVC {

	/**
	 * CmDEM
	 */
	@Autowired
	CmDEM cmDEM;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> selectMenuList() throws Exception {
		return cmDEM.getList("menu.selectMenuList");
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> selectRoleMenuList(Map<String, Object> param) throws Exception {
		return cmDEM.getList("menu.selectRoleMenuList", param);
	}
	
	@Override
	public int insertMenu(DataRequest dataRequest) throws Exception {
		int result = 0;
		
		Map<String, String> dm_menu = new HashMap<String, String>();
		ParameterGroup pGrpMenu = dataRequest.getParameterGroup("dm_menu");
		Iterator<ParameterRow> parameterRow = pGrpMenu.getAllRows();

		// 1. 메뉴 정보 생성
		dm_menu = parameterRow.next().toMap();
		dm_menu.put("REG_ID", "system");
		result = cmDEM.insert("menu.createMenu", dm_menu);
		
		// 2. 해당 메뉴의 메뉴매핑역할 정보 등록
		ParameterGroup pGrpRoleList = dataRequest.getParameterGroup("ds_roleList");
		Iterator<ParameterRow> pRowRoleList = pGrpRoleList.getAllRows();
		Map<String, String> roleMap = null;
		while(pRowRoleList.hasNext()) {
			roleMap = new HashMap<String, String>();
			roleMap = pRowRoleList.next().toMap();
			roleMap.put("MENU_ID", dm_menu.get("MENU_ID"));
			roleMap.put("REG_ID", "system");
			if("Y".equals(roleMap.get("ROLE_YN"))) {
				cmDEM.insert("menuMappingRole.createMenuMappingRole", roleMap);
			}
		}
		
		return result;
	}
	
	@Override
	public int updateMenu(DataRequest dataRequest) throws Exception {
		int result = 0;
		
		Map<String, String> dm_menu = new HashMap<String, String>();
		ParameterGroup pGrpMenu = dataRequest.getParameterGroup("dm_menu");
		Iterator<ParameterRow> parameterRow = pGrpMenu.getAllRows();

		// 1. 메뉴 정보 수정
		dm_menu = parameterRow.next().toMap();
		result = cmDEM.update("menu.updateMenu", dm_menu);
		
		// 2-1. 해당 메뉴의 메뉴매핑역할 정보 전체 삭제
		cmDEM.delete("menuMappingRole.deleteMenuMappingRole", dm_menu);
		
		// 2-2. 해당 메뉴의 메뉴매핑역할 정보 등록
		ParameterGroup pGrpRoleList = dataRequest.getParameterGroup("ds_roleList");
		Iterator<ParameterRow> pRowRoleList = pGrpRoleList.getAllRows();
		Map<String, String> roleMap = null;
		while(pRowRoleList.hasNext()) {
			roleMap = new HashMap<String, String>();
			roleMap = pRowRoleList.next().toMap();
			roleMap.put("MENU_ID", dm_menu.get("MENU_ID"));
			roleMap.put("REG_ID", "system");
			if("Y".equals(roleMap.get("ROLE_YN"))) {
				cmDEM.insert("menuMappingRole.createMenuMappingRole", roleMap);
			}
		}
		
		return result;
	}
	
	@Override
	public int deleteMenu(DataRequest dataRequest) throws Exception {
		int result = 0;
		
		Map<String, String> dm_menu = new HashMap<String, String>();
		ParameterGroup pGrpMenu = dataRequest.getParameterGroup("dm_menu");
		Iterator<ParameterRow> parameterRow = pGrpMenu.getAllRows();

		dm_menu = parameterRow.next().toMap();
		
		// 1. 메뉴매핑 역할 정보 삭제
		cmDEM.delete("menuMappingRole.deleteMenuMappingRole", dm_menu);
		
		// 2. 메뉴 정보 삭제
		result = cmDEM.delete("menu.deleteMenu", dm_menu);
		
		return result;
	}
}