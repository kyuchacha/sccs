package com.sccs.cm.hm.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.sys.cmmn.util.PagingMap;
import com.sccs.cm.sys.cmmn.util.XBUtil;

/**
 * 도움말 관리
 * @author syoh
 */
@Controller
@RequestMapping("/com/sccs/cm/hm")
public class CmHelpController {

	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * CmHelpService
	 */
	@Autowired
	CmHelpSVC cmHelpSVC;
	
	
	@RequestMapping("/selectHelpList.do")	
	public View selectHelpList(HttpServletRequest request, HttpServletResponse response,DataRequest dataRequest) throws Exception{
		Map<String, Object> reqParam = XBUtil.getParamMap(dataRequest, "dmParam");
		Map<String, Object> reqPageInfo = XBUtil.getParamMap(dataRequest, "dmPageInfo");
		
		int totalCount = cmHelpSVC.getTotalCount(reqParam);
		
		int pageNo = Integer.parseInt((String)reqPageInfo.get("pageNo"));
		
		PagingMap pagingMap = new PagingMap();
		XBUtil.setPageInfo(pagingMap, totalCount, pageNo);
		reqParam.put("startPageIdx", pagingMap.getStartPageIdx());
		reqParam.put("endPageIdx", pagingMap.getEndPageIdx());
		
		List<Map<String, Object>> helpList = cmHelpSVC.selectHelpList(reqParam);
		dataRequest.setResponse("dsHelp", helpList);
		
		Map<String, Object> dmPageInfo = new HashMap<String, Object>();
		dmPageInfo.put("recordsTotal", pagingMap.getRecordsTotal());
		dmPageInfo.put("pageIndexerCount", pagingMap.getPageIndexerCount());
		dmPageInfo.put("recordCountPerPage", pagingMap.getRecordCountPerPage());
		dmPageInfo.put("pageNo", pagingMap.getPageNo());
		dmPageInfo.put("paging", "Y");
		dataRequest.setResponse("dmPageInfo", dmPageInfo);
		
		return new JSONDataView();
	}



}