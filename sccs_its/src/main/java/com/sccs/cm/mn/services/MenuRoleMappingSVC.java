package com.sccs.cm.mn.services;

import java.util.List;
import java.util.Map;

public interface MenuRoleMappingSVC {

	List<Map<String,Object>> selectMenuMappingRoleList(Map<String, String> dm_menu) throws Exception;
	
}
