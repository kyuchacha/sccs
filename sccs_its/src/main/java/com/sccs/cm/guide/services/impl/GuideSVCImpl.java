package com.sccs.cm.guide.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sccs.cm.guide.services.GuideSVC;
import com.sccs.cm.sys.cmmn.services.CmDEM;

/**
 * 개발자 가이드 서비스 구현 클래스
 * @author syoh
 */
@Service
public class GuideSVCImpl implements GuideSVC {

	/**
	 * CmDEM
	 */
	@Autowired
	CmDEM cmDEM;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> getList(Map<String, Object> paramMap) throws Exception {
		return cmDEM.getList("guide.getList", paramMap);
	}
	
	@Override
	public int getTotalCount(Map<String, Object> paramMap) throws Exception {
		return (Integer)cmDEM.get("guide.getTotalCount", paramMap);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String,Object>> getDeptList(Map<String, Object> paramMap) throws Exception {
		return cmDEM.getList("guide.getDeptList", paramMap);
	}
	
	@Override
	public int insertSample(Map<String,String> sample) throws Exception {
		return cmDEM.insert("guide.insertSample", sample);
	}
	
	@Override
	public int updateSample(Map<String,String> sample) throws Exception {
		return cmDEM.update("guide.updateSample", sample);
	}
	
	@Override
	public int deleteSample(Map<String,String> sample) throws Exception {
		return cmDEM.delete("guide.deleteSample", sample);
	}
	
}