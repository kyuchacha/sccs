package com.sccs.cm.hm.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sccs.cm.hm.services.CmHelpSVC;
import com.sccs.cm.sys.cmmn.services.CmDEM;

/**
 * 도움말 관리 서비스
 * @author syoh
 */
@Service
public class CmHelpSVCImpl implements CmHelpSVC {

	/**
	 * CmDEM
	 */
	@Autowired
	CmDEM cmDEM;
	
	@Override
	public int getTotalCount(Map<String, Object> reqParam) throws Exception {
		return (Integer)cmDEM.get("help.getTotalCount", reqParam);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> selectHelpList(Map<String, Object> reqParam) throws Exception {
		return cmDEM.getList("help.getList", reqParam);
	}
	
}