package com.sccs.cm.guide;

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
import com.cleopatra.spring.JSONDataView;
import com.cleopatra.spring.UIView;
import com.sccs.cm.guide.services.GuideSVC;
import com.sccs.cm.sys.cmmn.util.MessageUtil;


@Controller
@RequestMapping("/com/sccs/cm/guide")
public class GuideController {

	
	/**
	 * GuideSVC
	 */
	@Autowired
	GuideSVC guideSVC;
	
	@RequestMapping("/init.do")
	public View sample(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		
		return new UIView("view/sample/EmployeeList.clx");
	}
	
	@RequestMapping("/selectDeptList.do")
	public View selectDeptList(HttpServletRequest req , HttpServletResponse res , DataRequest dataRequest) throws Exception {

		Map<String, Object> paramMap = new HashMap<String, Object>();
		List<Map<String,Object>> dataList = guideSVC.getDeptList(paramMap);
		dataRequest.setResponse("dsDeptList", dataList);
		return new JSONDataView();
	}
	
	@RequestMapping("/selectDialogDeptList.do")
	public View selectDialogDeptList(HttpServletRequest req , HttpServletResponse res , DataRequest dataRequest) throws Exception {
		
		ParameterGroup reqParam = dataRequest.getParameterGroup("dmParam");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("DEPT_NM", reqParam.getValue("strDept"));
		
		List<Map<String,Object>> dataList = guideSVC.getDeptList(paramMap);
		dataRequest.setResponse("dsList", dataList);
		return new JSONDataView();
	}
	
	@RequestMapping("/selectList.do")
	public View selectList(HttpServletRequest req , HttpServletResponse res , DataRequest dataRequest) throws Exception {
		
		//????????? ???????????? ????????? ????????? ?????? ????????? ?????? ???????????????.
		ParameterGroup reqPage = dataRequest.getParameterGroup("dmPage");
		ParameterGroup param = dataRequest.getParameterGroup("dmParam");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("EMP_NM", param.getValue("empNm"));
		paramMap.put("DEPT_CD", param.getValue("deptCd"));
		
		//????????? ???????????? ????????? ?????? ????????? ????????? ???????????????.
		int totalCount = guideSVC.getTotalCount(paramMap);
		
		//????????? ???????????? ????????? ????????? ???????????????.
		int totCnt  = totalCount;
		int pageIdx = Integer.parseInt((String)reqPage.getValue("pageIdx"));
		int rowSize = Integer.parseInt((String)reqPage.getValue("rowSize"));
		String sortCondition = (String)reqPage.getValue("sortCondition");
		
		//???????????? ????????? ??????????????? ??????????????????.
		int startIndex = ((pageIdx-1)*rowSize) + 1;
		
		paramMap.put("STARTIDX", startIndex);
		paramMap.put("ENDIDX"  , (startIndex+rowSize)-1);
		paramMap.put("SORT", sortCondition);
		List<Map<String,Object>> dataList = guideSVC.getList(paramMap);
		
		//??????????????? ????????? ???????????? ??????????????????.
		Map<String, Object> resPage = new HashMap<String, Object>();
		resPage.put("totCnt", totCnt);
		resPage.put("pageIdx", pageIdx);
		resPage.put("rowSize", rowSize);
		resPage.put("sortCondition", sortCondition);

		
		dataRequest.setResponse("dsList", dataList);
		dataRequest.setResponse("dmPage", resPage);
		
	
		return new JSONDataView();
	}
	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest req , HttpServletResponse res , DataRequest dataRequest) throws Exception {
		int result = 0;
		Map<String, String> dmMsg = new HashMap<String, String>();
		
		/**
		 * ??????????????? request??? ????????? ??? ????????? ???????????? ????????????.
		 * (INSERT, UPDATE, DELETE ???)
		 * ????????? ??????????????? ???????????? ?????? ???????????? ???????????? ????????????.
		 */
		ParameterGroup parameterGroup = dataRequest.getParameterGroup("dsList");
		
		if (parameterGroup != null) {
			Iterator<ParameterRow> iter;
			
			iter = parameterGroup.getInsertedRows();
			while (iter.hasNext()) {
				result = guideSVC.insertSample(iter.next().toMap());
			}
			iter = parameterGroup.getUpdatedRows();
			while (iter.hasNext()) {
				result = guideSVC.updateSample(iter.next().toMap());
			}
			iter = parameterGroup.getDeletedRows();
			while (iter.hasNext()) {
				result = guideSVC.deleteSample(iter.next().toMap());
			}
		}
		
		if(result > 0) {
			dmMsg.put("CODE", "S");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_PRC_S001"));
		} else {
			dmMsg.put("CODE", "E");
			dmMsg.put("MESSAGE", MessageUtil.getMessage("MSG_CM_PRC_E001"));
		}
	
		dataRequest.setResponse("dm_msg", dmMsg);
		return new JSONDataView();
	}
}
