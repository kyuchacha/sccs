package com.sccs.cm.sys.cmmn.util;

import java.util.HashMap;
import java.util.Map;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;


public class XBUtil {
	
	private XBUtil() {
	}
	
	/**
	 * usage : exbuilder.util.XBUtil.getParamMap(dataRequest, "reqKey");
	 * @param dataRequest
	 * @param groupName
	 * @return
	 */
	public static Map<String, Object> getParamMap(DataRequest dataRequest, String groupName) {
		if(dataRequest == null || groupName == null) {
			return null;
		}
		ParameterGroup paramGroup = dataRequest.getParameterGroup(groupName);
		if(paramGroup == null) {
			return null;
		}
		Map<String, Object> mapParam = new HashMap<String, Object>();
		String[] colNames = paramGroup.getColumnNames();
		if(colNames != null && colNames.length > 0) {
			for(int i = 0; i < colNames.length; i++) {
				String value = paramGroup.getValue(colNames[i]);
				mapParam.put(colNames[i], value);
			}
		}
		
		return mapParam;
	}
	
	public static void setPageInfo(PagingMap pagingMap, int totalCount, int startPageNo) {
		int iStartPageNo = startPageNo;
		int iPageSize = pagingMap.getRecordCountPerPage();
		
		// 시작 Row Index
		int startOffset = ((iStartPageNo - 1) * iPageSize) + 1;
		// 종료 Row Index
		int endOffset   = ((iStartPageNo - 1) * iPageSize) + iPageSize;		
		
		// 페이징 수
//		int pageIndexCount = 0;
//		if(totalCount%iPageSize == 0) {
//			pageIndexCount = totalCount / iPageSize;
//		} else {
//			pageIndexCount = (totalCount / iPageSize) + 1;
//		}
		pagingMap.setPageNo(startPageNo);
		pagingMap.setRecordsTotal(totalCount);
		pagingMap.setStartPageIdx(startOffset);
		pagingMap.setEndPageIdx(endOffset);
		pagingMap.setPageIndexerCount(pagingMap.getPageIndexerCount());
	}

}
