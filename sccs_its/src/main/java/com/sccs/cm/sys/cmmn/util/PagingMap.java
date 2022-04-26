package com.sccs.cm.sys.cmmn.util;

public class PagingMap {

	private int recordsTotal;
	private int pageIndexerCount;
	private int recordCountPerPage;
	private int pageNo;
	private int startPageIdx;
	private int endPageIdx;

	private String paging;

	public PagingMap() {
		this.pageNo = 1;
		this.recordCountPerPage = 50;
		this.pageIndexerCount = 10;
	}

	public int getRecordsTotal() {
		return recordsTotal;
	}

	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}

	public int getPageIndexerCount() {
		return pageIndexerCount;
	}

	public void setPageIndexerCount(int pageIndexerCount) {
		this.pageIndexerCount = pageIndexerCount;
	}

	public int getRecordCountPerPage() {
		return recordCountPerPage;
	}

	public void setRecordCountPerPage(int recordCountPerPage) {
		this.recordCountPerPage = recordCountPerPage;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getStartPageIdx() {
		return startPageIdx;
	}

	public void setStartPageIdx(int startPageIdx) {
		this.startPageIdx = startPageIdx;
	}

	public int getEndPageIdx() {
		return endPageIdx;
	}

	public void setEndPageIdx(int endPageIdx) {
		this.endPageIdx = endPageIdx;
	}
	
	public String getPaging() {
		return paging;
	}

	public void setPaging(String paging) {
		this.paging = paging;
	}

}
