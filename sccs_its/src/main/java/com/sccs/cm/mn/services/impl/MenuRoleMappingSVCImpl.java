package com.sccs.cm.mn.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sccs.cm.mn.services.MenuRoleMappingSVC;
import com.sccs.cm.sys.cmmn.services.CmDEM;

/**
 * 시스템 메뉴매핑 역할 서비스
 * @author syoh
 */
@Service
public class MenuRoleMappingSVCImpl implements MenuRoleMappingSVC {

	/**
	 * CommonDAO
	 */
	@Autowired
	CmDEM cmDEM;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> selectMenuMappingRoleList(Map<String, String> dm_menu) throws Exception {
		return cmDEM.getList("menuMappingRole.selectMenuMappingRoleList", dm_menu);
	}
	
}