package com.sccs.cm.sys.cmmn.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.ibatis.common.logging.Log;
import com.ibatis.common.logging.LogFactory;
import com.sccs.cm.sys.cmmn.log.services.LogSVC;

/**
 * 로그 관리
 * @author cjlee
 */
@Controller
public class LogController {

	/**
	 * Logger
	 */
	private Log logger = LogFactory.getLog(getClass());
	
	/**
	 * LogService
	 */
	@Autowired
	LogSVC logSVC;
	
	/**
	 * 로그 관리 목록 조회
	 * @param param
	 * @param pageVo
	 * @param model
	 * @return
	 * @throws RuntimeException
	 */
//	@RequestMapping(value="/sys/log/logMngList.do", method = {RequestMethod.GET, RequestMethod.POST})
//	public String logMngList(@RequestParam Map<String, Object> param, PaginationVO pageVo, ModelMap model) throws Exception {
//		
//		// 로그시작일시 또는 로그종료일시가 비워 있을 경우
//		if (StringUtils.isEmpty((String)param.get("searchLogBeginDt")) ||
//			StringUtils.isEmpty((String)param.get("searchLogEndDt"))) {
//			param.put("searchLogBeginDt", DateUtil.getDateString(DateUtil.getMonthAdd(DateUtil.getSysDate(), -1), "yyyy-MM-dd"));
//			param.put("searchLogEndDt", DateUtil.getSysDate("yyyy-MM-dd"));
//		}
//		
//		// 페이징 셋팅
//		PaginationInfo paginationInfo = pageVo.getPaginationInfo(logSVC.selectLogMngCnt(param));
//		model.put("paginationInfo", paginationInfo);
//		
//		param.put("firstIndex", pageVo.getFirstIndex());
//		param.put("lastIndex", pageVo.getLastIndex());
//		
//		// 로그 목록 조회 (페이징)
//		model.put("logList", logSVC.selectLogMngPageList(param));
//		
//		// 파라미터맵 셋팅
//		model.put("paramMap", param);
//		
//		return "com/sys/log/logMng";
//	}
	
	/**
	 * 메뉴 이용횟수 목록 조회
	 * @param param
	 * @param pageVo
	 * @param model
	 * @return
	 * @throws RuntimeException
	 */
//	@RequestMapping(value="/sys/log/menuUseCntList.do", method = {RequestMethod.GET, RequestMethod.POST})
//	public String menuUseCntList(@RequestParam Map<String, Object> param, PaginationVO pageVo, ModelMap model) throws Exception {
//		
//		// 메뉴 이용횟수 목록 조회
//		model.put("menuUseCntList", logSVC.selectMenuUseCntList(param));
//		
//		return "com/sys/log/menuUseCnt";
//	}
}