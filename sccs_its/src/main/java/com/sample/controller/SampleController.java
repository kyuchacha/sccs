package com.sample.controller;

import java.io.File;
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
import com.cleopatra.protocol.data.UploadFile;
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sample.SampleService;
import com.sccs.cm.sys.cmmn.util.FileUploadUtil;
import com.sccs.cm.sys.cmmn.util.MessageUtil;

import egovframework.rte.psl.dataaccess.util.EgovMap;



@Controller
@RequestMapping("/com")
public class SampleController{
	private Log logger = LogFactory.getLog(getClass());
	
	@Autowired
	SampleService sampleService;
	
	@RequestMapping("/sample.do")
	public View sample(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/sample/sample.clx");
	}
	
	@RequestMapping("/menuTree.do")
	public View menuTree(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/sample/menuTree.clx");
	}
	
	@RequestMapping("/mainLayout.do")
	public View mainLayout(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/sample/mainLayout.clx");
	}
	
	
	@RequestMapping("/sampleList.do")	
	public View sampleList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		logger.debug("test?????????");
		List<Map<String,Object>> list = sampleService.sampleList();
		
		dataRequest.setResponse("ds1", list);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/selectDeptNm.do")	
	public View selectDeptNm(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		ParameterGroup param = dataRequest.getParameterGroup("dmParam");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		paramMap.put("empNo", param.getValue("empNo"));
		EgovMap deptNm = sampleService.selectDeptNm(paramMap);
		
		dataRequest.setResponse("resultData", deptNm);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/uploadClx.do")
	public View uploadClx(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/sample/fileUploadSample.clx");
	}
	
	@RequestMapping("/uploadTemporary.do")	
	public View upload(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception{
		ParameterGroup param = dataRequest.getParameterGroup("dmParam");
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		Map<String, UploadFile[]> uploadedFiles = dataRequest.getUploadFiles();
		
		List<HashMap<String, Object>> atchFileList = FileUploadUtil.fileListUpload("", uploadedFiles);
		
		dataRequest.setResponse("ds_atchFileList", atchFileList);
		System.out.println("completed...");
		
		return new JSONDataView();
	}
	
	
	/******************************************************************************************************************************/
	
	@RequestMapping("/selectMsCodeList.do")	
	public View selectMsCodeList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		
		HashMap param = new HashMap();
		ParameterGroup pGrp= dataRequest.getParameterGroup("searchMap");

		if(pGrp!=null) {
			param.put("searchCmb", pGrp.getValue("searchCmb"));
			param.put("searchTxt", pGrp.getValue("searchTxt"));
		}
		
		List<Map<String,Object>> list = sampleService.selectMsCodeList(param);
		
		dataRequest.setResponse("msDs", list);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/selectSubCodeList.do")	
	public View selectSubCodeList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		HashMap param = new HashMap();
		ParameterGroup pGrp= dataRequest.getParameterGroup("msDataMap");
		
		param.put("grpCd",pGrp.getValue("grpCd"));
		
		List<Map<String,Object>> list = sampleService.selectSubCodeList(param);
		
		dataRequest.setResponse("subDs", list);
		
		return new JSONDataView();
	}
	
	@RequestMapping("/saveMsCode.do")
	public View saveMsCode(HttpServletRequest req , HttpServletResponse res , DataRequest dataRequest) throws Exception {
		
		int result = 0;
		Map<String, String> dmMsg = new HashMap<String, String>();
		
		/**
		 * 데이터셋은 request로 넘어올 때 각각의 상태값을 포함한다.
		 * (INSERT, UPDATE, DELETE 등)
		 * 따라서 데이터셋의 상태값을 통해 해당하는 쿼리문을 실행한다.
		 */
		ParameterGroup parameterMsGroup = dataRequest.getParameterGroup("msDs");
		ParameterGroup parameterSubGroup = dataRequest.getParameterGroup("subDs");
		
		if (parameterMsGroup != null) {
			Iterator<ParameterRow> iter;
			
			iter = parameterMsGroup.getInsertedRows();
			while (iter.hasNext()) {
				result = sampleService.insertMsCode(iter.next().toMap());
			}
			iter = parameterMsGroup.getUpdatedRows();
			while (iter.hasNext()) {
				result = sampleService.updateMsCode(iter.next().toMap());
			}
		}
		
		if (parameterSubGroup != null) {
			Iterator<ParameterRow> iter;
			
			iter = parameterSubGroup.getInsertedRows();
			while (iter.hasNext()) {
				result = sampleService.insertSubCode(iter.next().toMap());
			}
			iter = parameterSubGroup.getUpdatedRows();
			while (iter.hasNext()) {
				result = sampleService.updateSubCode(iter.next().toMap());
					
			}
			
		}
		
		if(result > 0) {
			dmMsg.put("CODE", "S");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_PRC_S001"));
		} else {
			dmMsg.put("CODE", "E");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_PRC_E001"));
		}
		
		
		dataRequest.setResponse("dmMsg", dmMsg);
		return new JSONDataView();
	}
	
	
}
