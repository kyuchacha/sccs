package com.sccs.cm.mn.services;

import java.util.List;
import java.util.Map;

import com.cleopatra.protocol.data.DataRequest;

public interface MenuSVC {

	List<Map<String,Object>> selectMenuList() throws Exception;
	
	List<Map<String,Object>> selectRoleMenuList(Map<String, Object> param) throws Exception;
	
	int insertMenu(DataRequest dataRequest) throws Exception;
	
	int updateMenu(DataRequest dataRequest) throws Exception;
	
	int deleteMenu(DataRequest dataRequest) throws Exception;
	
}
