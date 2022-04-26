package com.sample;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public interface SampleService {

	List<Map<String,Object>> sampleList()throws Exception;

	EgovMap selectDeptNm(Map<String, Object> param)throws Exception;

	List<Map<String, Object>> selectMsCodeList(Map<String, Object> param)throws Exception;

	int insertMsCode(Map<String, String> map)throws Exception;

	int insertSubCode(Map<String, String> map)throws Exception;

	List<Map<String, Object>> selectSubCodeList(HashMap param)throws Exception;

	int updateMsCode(Map<String, String> map)throws Exception;

	int updateSubCode(Map<String, String> map)throws Exception;

}
