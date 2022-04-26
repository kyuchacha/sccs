package com.sccs.cm.sys.cmmn.util;

import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 엑셀 다운로드 유틸
 * @author cjlee
 */
public class ExcelDownloadUtil {
	
	SXSSFWorkbook workBook = null;
	
	/**
	 * 엑셀 다운로드 생성
	 */
	public ExcelDownloadUtil() {
		if (this.workBook == null) {
			this.workBook = new SXSSFWorkbook();
		}
	}
    
    /**
     * WorkBook 읽기
     * @param seetName
     * @param headerList
     * @param headerKey
     * @param dataList
     * @return
     * @throws Exception
     */
    public SXSSFWorkbook renderWorkBook( String seetName,  String[] headerList, String[] headerKey, List<EgovMap> dataList ) throws Exception {
    	
        // 시트 생성
        SXSSFSheet sheet = this.workBook.createSheet(seetName);
        
        //style 적용
        CellStyle cellStyle = this.workBook.createCellStyle();
        cellStyle.setBorderTop(BorderStyle.THIN);
        cellStyle.setBorderBottom(BorderStyle.THIN);
        cellStyle.setBorderLeft(BorderStyle.THIN);
        cellStyle.setBorderRight(BorderStyle.THIN);
        
        // 헤더 행 생성
        Row headerRow = sheet.createRow(0);
                
        for(int i = 0; i < headerList.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headerList[i]);
            headerCell.setCellStyle(cellStyle);
        }
        
        //내용 행 및 셀 생성
        Row bodyRow = null;
        Cell bodyCell = null;
        for (int i=0; i<dataList.size(); i++) {
            
        	// 행 생성
            bodyRow = sheet.createRow(i+1);
        	
        	Map<String, Object> data = dataList.get(i);                        
        	
        	for (int j = 0; j < headerKey.length ; j++) {
        		 bodyCell = bodyRow.createCell(j);
        		 Object value = data.get(headerKey[j]);
        		 
        		 if (value == null) {
        			 value = "";
        		 }
        		 
        		 bodyCell.setCellValue(value.toString());
        		 bodyCell.setCellStyle(cellStyle);
        	}    	
  	     }
                
        return this.workBook;
    }
}