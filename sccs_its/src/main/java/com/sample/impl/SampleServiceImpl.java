package com.sample.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.SampleService;
import com.sccs.cm.sys.cmmn.services.CmDEM;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service
public class SampleServiceImpl implements SampleService{

	@Autowired
	CmDEM cmDEM;
	
	@Override
	public List<Map<String,Object>> sampleList() throws Exception {
		return cmDEM.getList("sample.sampleList"); 
	}

	@Override
	public EgovMap selectDeptNm(Map<String, Object> param) throws Exception {
		return (EgovMap) cmDEM.get("sample.selectDeptNm", param);
	}

	@Override
	public List<Map<String, Object>> selectMsCodeList(Map<String, Object> param) throws Exception {
		return cmDEM.getList("sample.selectMsCodeList",param);
	}

	@Override
	public int insertMsCode(Map<String, String> map) throws Exception {
		return cmDEM.insert("sample.insertMsCode",map);
	}

	@Override
	public int insertSubCode(Map<String, String> map) throws Exception {
		return cmDEM.insert("sample.insertSubCode",map);
	}

	@Override
	public List<Map<String, Object>> selectSubCodeList(HashMap param) throws Exception {
		return cmDEM.getList("sample.selectSubCodeList",param);
	}

	@Override
	public int updateMsCode(Map<String, String> map) throws Exception {
		return cmDEM.update("sample.updateMsCode",map);
	}

	@Override
	public int updateSubCode(Map<String, String> map) throws Exception {
		return cmDEM.update("sample.updateSubCode",map);
	}

}
