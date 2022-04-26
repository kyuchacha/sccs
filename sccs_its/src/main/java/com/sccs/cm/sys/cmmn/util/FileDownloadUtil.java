package com.sccs.cm.sys.cmmn.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.sql.Blob;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 파일 다운로드 공통 유틸
 * @author cjlee
 */
public class FileDownloadUtil {

	/**
	 * Path 있는 파일 다운로드
	 * @param fileMap
	 * @param request
	 * @param response
	 * @throws RuntimeException
	 * @throws IOException
	 */
	public static void fileDownload(EgovMap fileMap,
			HttpServletRequest request, HttpServletResponse response)throws RuntimeException, IOException {
		String path = ParamUtil.null2String(fileMap.get("filePath"), "");
		String dtlPath = ParamUtil.null2String(fileMap.get("fileDtlPath"), "");
		String fileNm = ParamUtil.null2String(fileMap.get("fileStreNm"), "");
		String fileDownNm = ParamUtil.null2String(fileMap.get("fileOrginlNm"), "");
		
		File file = null;
		try {
			file = new File(path+fileNm);
			String agentType = request.getHeader("User-Agent");

			if(agentType.indexOf("Trident")>= 0) {
				response.setContentType("application/octet-stream/x-msdownload");
				response.setHeader("Content-Disposition","attachment; filename=" + (URLEncoder.encode(fileDownNm, "utf-8")).replaceAll("\\+", "%20") + ";");

			}else {
				response.setContentType("doesn/matter");
				response.setHeader("Content-Disposition","attachment; filename=" + (URLEncoder.encode(fileDownNm, "utf-8")).replaceAll("\\+", "%20") + ";");
			}
			
			if(file.exists() && file.isFile()) {
				BufferedInputStream is = null;
				BufferedOutputStream os = null;
				FileInputStream fis=null;
				try {
					fis=new FileInputStream(file);
					is = new BufferedInputStream(fis);
					os = new BufferedOutputStream(response.getOutputStream());
					byte[] buffer = new byte[1024];
					int readcount = 0;
					while((readcount = is.read(buffer))!= -1) {
						os.write(buffer,0,readcount);
						os.flush();
					}
				}catch(IOException e) {
					LogUtil.getStackTraceLog(e);

				}finally {
					if(os != null) {
						os.close();
					}
					if(fis!=null) {
						fis.close();
					}
					if(is != null) {
						is.close();
					}
				}
			}
		} catch (IOException e) {
			LogUtil.getStackTraceLog(e);
		} 		
	}
	
	/**
	 * BLOB용 파일 다운로드
	 * @param request
	 * @param response
	 * @param blob
	 * @param fileNm
	 * @throws RuntimeException
	 * @throws IOException
	 */
	public static void fileDownloadBlob(HttpServletRequest request
									  , HttpServletResponse response
									  , Blob blob
									  , String fileNm) throws RuntimeException, IOException {
		
		try {
			
			String agentType = request.getHeader("User-Agent");

			if (agentType.indexOf("Trident") >= 0) {
				response.setContentType("application/octet-stream/x-msdownload");
			} else {
				response.setContentType("doesn/matter");
			}
			response.setHeader("Content-Disposition","attachment; filename=" + (URLEncoder.encode(fileNm, "utf-8")).replaceAll("\\+", "%20") + ";");
			
			ServletOutputStream out = response.getOutputStream();
			InputStream in = blob.getBinaryStream();
			
			int length = (int)blob.length();
			byte[] buffer = new byte[1024];
			while ((length = in.read(buffer)) != -1) {
				out.write(buffer, 0, length);
			}
			in.close();
			out.flush();
			
		} catch (Exception e) {
			LogUtil.getStackTraceLog(e);
			e.printStackTrace();
		} 		
	}
	
	/**
	 * byte용 파일 다운로드
	 * @param request
	 * @param response
	 * @param blob
	 * @param fileNm
	 * @throws RuntimeException
	 * @throws IOException
	 */
	public static void fileDownloadByte(HttpServletRequest request
									  , HttpServletResponse response
									  , byte[] bytes
									  , String fileNm) throws RuntimeException, IOException {
		
		try {
			
			String agentType = request.getHeader("User-Agent");

			if (agentType.indexOf("Trident") >= 0) {
				response.setContentType("application/octet-stream/x-msdownload");
			} else {
				response.setContentType("doesn/matter");
			}
			response.setHeader("Content-Disposition","attachment; filename=" + (URLEncoder.encode(fileNm, "utf-8")).replaceAll("\\+", "%20") + ";");
			
			ServletOutputStream out = response.getOutputStream();
			InputStream in = new ByteArrayInputStream(bytes);
			
			int length = bytes.length;
			byte[] buffer = bytes;
			while ((length = in.read(buffer)) != -1) {
				out.write(buffer, 0, length);
			}
			in.close();
			out.flush();
			
		} catch (Exception e) {
			LogUtil.getStackTraceLog(e);
			e.printStackTrace();
		} 		
	}

	/**
	* @method 설명 : 이미지 파일 view
	* @param EgovMap, HttpServletRequest, HttpServletResponse
	* @return 
	* @exception RuntimeException, IOException
	*/
	public static void imageFileView(EgovMap fileMap,
			HttpServletRequest request, HttpServletResponse response)throws RuntimeException, IOException {
		String path = ParamUtil.null2String(fileMap.get("filePath"), "");
		String fileNm = ParamUtil.null2String(fileMap.get("fileStreNm"), "");
		String fileExt = ParamUtil.null2String(fileMap.get("fileExtsn"), "");
		
		File file = null;
		try{
			// img 확장자 가져오기
			String imgExt = ParamUtil.null2String(ConfigUtil.getString("IMG_EXT"),"");
			
			// 이미지 확장자가 맞는 경우 진행
			if(fileExt.compareToIgnoreCase(imgExt)>-1){
				
				file = new File(path+fileNm);
				response.setContentType( "image/gif" );
				ServletOutputStream bout = response.getOutputStream();
				
				FileInputStream f = new FileInputStream(file); 
				
				int length;
				byte[] buffer = new byte[10];
				while ( ( length = f.read( buffer ) ) != -1 ){
					bout.write( buffer, 0, length );
				}
				
				f.close();
			}
			
		}catch(IOException e){
			LogUtil.getStackTraceLog(e);
		}catch(RuntimeException e){
			LogUtil.getStackTraceLog(e);
		}
	}

	
	/**
	 *  파일명을 "|" 기준으로 split 하여 배열로 Return
	 *  ex)
	 *       L.O pump 1.pdf(412 KB)|L.O pump 2.pdf(348 KB)| => [L.O pump 1.pdf(412 KB)],[L.O pump 2.pdf(348 KB)]
	 * @param fileName
	 * @return
	 */
	public  String[] splitFileArr(String fileName) {
		String[] fileNameArr = fileName.split("\\|");
		return fileNameArr;
	}
	
	
	/**
	 * 파일명에서 파일size 부분을 제거
	 *  ex)
	 *  	L.O pump 1.pdf(412 KB) => L.O pump 1.pdf
	 * @param fileName
	 * @return
	 */
	public String splitFileSize(String fileName) {
		String returnFileName="";
		
		int fileNameStrLength = fileName.length()-1; //파일명 전체 길이(길이는 1부터 시작이므로 index와 비교하기 위해 -1 한다.)
		int endIndex = fileName.lastIndexOf(")"); // ")"로 마지막으로 끝나는 index
		
		if(fileNameStrLength == endIndex) { // ")" 로 끝나면
			int startIndex = fileName.lastIndexOf("("); // "(" 가 포함된 인덱스를 찾는다. 
			returnFileName = fileName.substring(0, startIndex);
		}
					
		System.out.println(returnFileName);
		return returnFileName;
	}
	
}
