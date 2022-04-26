package com.sccs.cm.hm.services;

import java.util.List;
import java.util.Map;

import com.cleopatra.protocol.data.DataRequest;

public interface CmHelpSVC {

	int getTotalCount(Map<String, Object> reqParam) throws Exception;
	
	List<Map<String,Object>> selectHelpList(Map<String, Object> reqParam) throws Exception;
	
}
