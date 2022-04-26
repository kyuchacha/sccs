package com.sccs.cm.sys.cmmn.services;

import org.apache.commons.lang3.builder.ToStringBuilder;

import egovframework.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

/**
 * 페이징처리 VO
 * @author cjlee
 */
public class PaginationVO {
	
	/** 현재페이지 */
    private int pageIndex = 1;
    
    /** 페이지갯수 */
    private int pageUnit = 10;
    
    /** 페이지사이즈 */
    private int pageSize = 10;

    /** firstIndex */
    private int firstIndex = 1;

    /** lastIndex */
    private int lastIndex = 1;

    /** recordCountPerPage */
    private int recordCountPerPage = 10;
	
	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageUnit() {
		return pageUnit;
	}

	public void setPageUnit(int pageUnit) {
		this.pageUnit = pageUnit;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getFirstIndex() {
		return firstIndex;
	}

	public void setFirstIndex(int firstIndex) {
		this.firstIndex = firstIndex;
	}

	public int getLastIndex() {
		return lastIndex;
	}

	public void setLastIndex(int lastIndex) {
		this.lastIndex = lastIndex;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}
	
	public PaginationInfo getPaginationInfo(int totalRecordCount) {
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setTotalRecordCount(totalRecordCount);
		paginationInfo.setCurrentPageNo(this.getPageIndex());
		paginationInfo.setRecordCountPerPage(this.getPageUnit());
		paginationInfo.setPageSize(this.getPageSize());
		this.setFirstIndex(paginationInfo.getFirstRecordIndex()+1);
		this.setLastIndex(paginationInfo.getLastRecordIndex());
		this.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		return paginationInfo;
	}

	 public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
