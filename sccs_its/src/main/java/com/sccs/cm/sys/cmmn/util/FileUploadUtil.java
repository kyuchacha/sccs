package com.sccs.cm.sys.cmmn.util;

import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.cleopatra.protocol.data.UploadFile;
import com.sccs.cm.sys.cmmn.constants.EpmsConstants;

import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 파일 업로드 공통 유틸
 * @author cjlee
 */
public class FileUploadUtil {
	
	/**
	 * 이미지 파일 확장자 목록
	 */
	public static final String[] IMG_EXT_ARR = {"JPG","JPEG","PNG","GIF","BMP"};
	
	/**
	 * 업로드 허용 파일 전체 확장자 목록
	 */
	public static final String[] ALL_EXT_ARR = {"JPG","JPEG","PNG","GIF","BMP","DOC","HWP","PDF","XLS","XLSX","TXT","PPT","PPTX","ZIP"};
	
	/**
	* @method 설명 : 파일 업로드
	* @param Map<String, Object>, MultipartHttpServletRequest
	* @return String 파일 ID
	* @exception RuntimeException, IOException
	*/
	public static HashMap<String, Object> fileUpload(Map<String, Object> map,
			MultipartHttpServletRequest mtrq)throws RuntimeException, IOException {
		MultipartFile file = mtrq.getFile("upload");
		HashMap<String, Object> resultMap = null;
		if(null != file){
			resultMap = new HashMap<String, Object>();
			
			Calendar cal = Calendar.getInstance();
			int mon = cal.get(Calendar.MONTH) + 1;
			String path = ParamUtil.null2String(map.get("group"), "");
			String dtlPath = File.separator+cal.get(Calendar.YEAR)+File.separator+(mon>10?mon:"0"+mon)+File.separator;
			
			// 파일 디렉토리 존재여부 확인 후 없으면 생성
			File upPath = new File(path+dtlPath);
			if(!upPath.exists()){
				upPath.mkdirs();
			}
			
			String orgFileNm = file.getOriginalFilename();							// 원본 파일 명
			String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 저장 파일명
			String saveFileNm = KeyHelper.getStringKey() + "." + upFileExt;			// 파일 확장자
			long fileSize=file.getSize();											// 파일 사이즈
			
			File myfile = new File(path+dtlPath, saveFileNm);
			file.transferTo(myfile);
			
			resultMap.put("filePath", path);
			resultMap.put("orgFileNm", orgFileNm);
			resultMap.put("fileExt", upFileExt);
			resultMap.put("saveFileNm", dtlPath+saveFileNm);
			resultMap.put("fileSize", fileSize);
			
			// 이미지파일 여부
			boolean imgSe = seImgFile(upFileExt);
			
			if(imgSe){
				Image image = ImageIO.read(myfile);
				int width = image.getWidth(null);
				int height = image.getHeight(null);
				
				resultMap.put("width", width);
				resultMap.put("height", height);
			}
		}
		
		return resultMap;
	}
	
	/**
	* @method 설명 : 파일 업로드
	* @param Map<String, Object>, MultipartHttpServletRequest
	* @return String 파일 ID
	* @exception RuntimeException, IOException
	*/
	public static List<HashMap<String, Object>> fileListUpload(Map<String, Object> map,
			MultipartHttpServletRequest mtrq)throws RuntimeException, IOException {
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		
		Calendar cal = Calendar.getInstance();
		int mon = cal.get(Calendar.MONTH) + 1;
		String path = ParamUtil.null2String(map.get("group"), "");
		String dtlPath = File.separator+cal.get(Calendar.YEAR)+File.separator+(mon>10?mon:"0"+mon)+File.separator;
		
		// 파일 디렉토리 존재여부 확인 후 없으면 생성
		File upPath = new File(path+dtlPath);
		if(!upPath.exists()){
			upPath.mkdirs();
		}
		
		List<MultipartFile> files = mtrq.getFiles("upload");
		if(files.size()>0){
			for(int i=0; i<files.size(); i++){
				MultipartFile file = files.get(i);
				
				if(null == file) continue;		// 파일 없는 경우 continue
				
				HashMap<String, Object> resultMap = new HashMap<String, Object>();
				
				String orgFileNm = file.getOriginalFilename();							// 원본 파일 명
				String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 파일 확장자
				String saveFileNm = KeyHelper.getStringKey() + "." + upFileExt;			// 저장 파일명
				long fileSize=file.getSize();											// 파일 사이즈
				
				File myfile = new File(path+dtlPath, saveFileNm);
				file.transferTo(myfile);
				
				resultMap.put("filePath", path);
				resultMap.put("orgFileNm", orgFileNm);
				resultMap.put("fileExt", upFileExt);
				resultMap.put("saveFileNm", dtlPath+saveFileNm);
				resultMap.put("fileSize", fileSize);
				
				// 이미지파일 여부
				boolean imgSe = seImgFile(upFileExt);
				if(imgSe){
					Image image = ImageIO.read(myfile);
					int width = image.getWidth(null);
					int height = image.getHeight(null);
					
					resultMap.put("width", width);
					resultMap.put("height", height);
				}
				
				resultList.add(resultMap);
			}
		}
		
		return resultList;
	}

	/**
	 * 설명 : 파일 업로드
	 * @param workDirName
	 * @param mtrq
	 * @param fileGroupName : form에 담긴 input file name
	 * @throws RuntimeException
	 * @throws IOException
	 */
	public static List<HashMap<String, Object>> fileListUpload(String workDirName,
			MultipartHttpServletRequest mtrq, String fileGroupName)throws RuntimeException, IOException {
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		
		Calendar cal = Calendar.getInstance();
		int mon = cal.get(Calendar.MONTH) + 1;
		String path = workDirName;
		String dtlPath = File.separator+cal.get(Calendar.YEAR)+File.separator+(mon>10?mon:"0"+mon)+File.separator;
		
		// 디렉토리 존재 확인 후 없으면 생성
		File upPath = new File(path+dtlPath);
		if(!upPath.exists()){
			upPath.mkdirs();
		}
		
		List<MultipartFile> files = mtrq.getFiles(fileGroupName);
		if(files.size()>0){
			for(int i=0; i<files.size(); i++){
				MultipartFile file = files.get(i);
				HashMap<String, Object> resultMap = new HashMap<String, Object>();
				
				if(null == file) continue;		// 파일 없는 경우 continue
				
				String orgFileNm = file.getOriginalFilename();							// 원본 파일 명
				String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 파일 확장자
				String saveFileNm = KeyHelper.getStringKey() + "." + upFileExt;			// 저장 파일명
				long fileSize=file.getSize();											// 파일 사이즈
				
				File myfile = new File(path+dtlPath, saveFileNm);
				file.transferTo(myfile);
				
				resultMap.put("filePath", path);
				resultMap.put("orgFileNm", orgFileNm);
				resultMap.put("fileExt", upFileExt);
				resultMap.put("saveFileNm", dtlPath+saveFileNm);
				resultMap.put("fileSize", fileSize);
				
				// 이미지파일 여부
				boolean imgSe = seImgFile(upFileExt);
				
				if(imgSe){
					Image image = ImageIO.read(myfile);
					int width = image.getWidth(null);
					int height = image.getHeight(null);
					resultMap.put("width", width);
					resultMap.put("height", height);
				}
				
				resultList.add(resultMap);
			}
		}
		
		return resultList;
	}
	
	/**
	 * BLOB 업로드용 파일 목록 취득
	 * @param mtrq
	 * @param fileObjNm
	 * @param allowExts
	 * @return
	 * @throws Exception
	 */
	public static List<Map<String, Object>> getFileListByte(MultipartHttpServletRequest mtrq
															, String fileObjNm
															, String allowExts) throws Exception {
		
		List<Map<String, Object>> fileList = new ArrayList<Map<String, Object>>();
		Map<String, Object> fileMap;
		String fileNm;
				
		List<MultipartFile> upFileList =  mtrq.getFiles(fileObjNm);
		File file;
		
		for (MultipartFile mFile : upFileList) {
			
			fileNm = mFile.getOriginalFilename();
			
			if (checkFileExt(fileNm, allowExts)) {
				
				file = new File(fileNm+"_1");
				mFile.transferTo(file);
				
				BufferedImage image = ImageIO.read(file);
				
				// 이미지일 경우 buf 값이 null이 아님
				if (image != null) {
					
					int width = image.getWidth();
					int height = image.getHeight();
					
					// 이미지의 가로 사이즈가 기준 사이즈를 초과할 경우
					if (EpmsConstants.IMAGE_FILE_WIDTH_MAX_SIZE < width) {
						
						double ratio = (double)EpmsConstants.IMAGE_FILE_WIDTH_MAX_SIZE / (double)width;
						int newWidth = (int)(width * ratio);
						int newHeight = (int)(height * ratio);
						
						// 이미지 리사이즈
						// Image.SCALE_DEFAULT : 기본 이미지 스케일링 알고리즘 사용
						// Image.SCALE_FAST    : 이미지 부드러움보다 속도 우선
						// Image.SCALE_REPLICATE : ReplicateScaleFilter 클래스로 구체화 된 이미지 크기 조절 알고리즘
						// Image.SCALE_SMOOTH  : 속도보다 이미지 부드러움을 우선
						// Image.SCALE_AREA_AVERAGING  : 평균 알고리즘 사용
						Image resizeImage = image.getScaledInstance(newWidth, newHeight, Image.SCALE_SMOOTH);
						
						BufferedImage newImage = new BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB);
						Graphics g = newImage.getGraphics();
						g.drawImage(resizeImage, 0, 0, null);
						g.dispose();
						
						// 확장자
						String ext = fileNm.substring(fileNm.lastIndexOf(".") + 1);
			            
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(newImage, ext, baos);
						baos.flush();
						
						mFile = new MultipartImage(baos.toByteArray()
												 , mFile.getName()
												 , mFile.getOriginalFilename()
												 , mFile.getContentType()
												 , baos.size()
												);
					}
				}

				fileMap = new HashMap<String, Object>();
				fileMap.put("fileNm", fileNm);
				fileMap.put("fileSize", mFile.getSize());
				fileMap.put("file", mFile.getBytes());
				fileList.add(fileMap);
				
			} else {
				throw new Exception("허용되지 않은 확장자입니다. 파일명 : " + fileNm);
			}
		}
		
		return fileList;
	}
	
	/**
	 * BLOB 업로드용 byte 파일 조회
	 * @param mtrq
	 * @param fileObjNm
	 * @param allowExts
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> getFileByte(MultipartHttpServletRequest mtrq
									, String fileObjNm
									, String allowExts) throws Exception {
		
		MultipartFile file = mtrq.getFile(fileObjNm);
		Map<String, Object> fileMap = new HashMap<String, Object>();
		String fileNm;
		
		if (file != null) {
			
			fileNm = file.getOriginalFilename();
			
			if (checkFileExt(fileNm, allowExts)) {
				
				fileMap.put("fileNm", fileNm);
				fileMap.put("file", file.getBytes());

				return fileMap;
				
			} else {
				throw new Exception("허용되지 않은 확장자입니다. 파일명 : " + file.getOriginalFilename());
			}
			
		} else {
			
			return null;
		}
	}
	
	/**
	 * @method 설명 : 파일 삭제
	 * @param EgovMap
	 * @return 
	 * @exception 
	 */
	public static void deleteFile(EgovMap deltMap)throws RuntimeException, IOException {
		String path = ParamUtil.null2String(deltMap.get("filePath"), "");
		String fileNm = ParamUtil.null2String(deltMap.get("fileStreNm"), "");
		
		File delPath = new File(path+fileNm);
		
		if(delPath.exists()){
			delPath.delete();
		}
	}
	
	/**
	* @method 설명 : 파일 전체 삭제
	* @param EgovList<Map>
	* @return 
	* @exception 
	*/
	public static void deleteFiles(List<EgovMap> fileList)throws RuntimeException, IOException {
		for (int i = 0; i < fileList.size(); i++) {
			FileUploadUtil.deleteFile(fileList.get(i));
		}
	}
	
	/**
	 * 파일 확장자 체크
	 * @param mtrq 
	 * @param fileName form의 input file name
	 * @param allowExtArray 허용할 파일 확장자
	 * @return
	 */
	public static boolean checkFileExt(MultipartHttpServletRequest mtrq, String fileName, String[] allowExtArray) {
		List<MultipartFile> files = mtrq.getFiles(fileName);
		boolean resultValue = true;
				
		if(files.size()>0){
			for(int i=0; i<files.size(); i++){
				MultipartFile file = files.get(i);
				
				if(null == file) continue;
				
				String orgFileNm = file.getOriginalFilename();							// 원본 파일 명
				String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 파일 확장자
				
				// 파일 여부
				boolean fileSe = seFile(upFileExt, allowExtArray);
				
				if(!(fileSe)){
					resultValue = false;
					break;
				}
				
			}
		}
		return resultValue;
	}
	
	/**
	 * 파일 확장자 체크2
	 * @param fileNm
	 * @param allowExts
	 * @return
	 */
	public static boolean checkFileExt(String fileNm, String allowExts) {
		
		String ext = fileNm.substring(fileNm.lastIndexOf(".")).toLowerCase();
		
		for (String allow : allowExts.split(",")) {
			
			if (allow.equals(ext)) {
				return true;
			}
		}
		
		return false;
	}

	/**
	* @method 설명 : 이미지 확장자 체크
	* @param 
	* @return 
	* @exception 
	*/
	public static boolean chkImgExt(MultipartHttpServletRequest mtrq, String[] allowExtArray) {
		List<MultipartFile> files = mtrq.getFiles("upload");
		boolean resultValue = true;
		
		if(files.size()>0){
			for(int i=0; i<files.size(); i++){
				MultipartFile file = files.get(i);
				
				if(null == file) continue;		// 파일 없는 경우 continue
				
				HashMap<String, Object> resultMap = new HashMap<String, Object>();
				String orgFileNm = file.getOriginalFilename();							// 원본 파일 명
				String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 저장 파일명
				
				// 이미지파일 여부
				boolean imgSe = seImgFile(upFileExt);
				
				// 파일 여부
				boolean fileSe = seFile(upFileExt, allowExtArray);
				
				if(!(imgSe || fileSe)){
					resultValue = false;
					break;
				}
				
			}
		}
		
		
		return resultValue;
	}
	
	/**
	* @method 설명 : 이미지파일여부 확인
	* @param String 확장자
	* @return boolean 확장자 일치 여부
	* @exception 
	*/
	public static boolean seImgFile(String ext){
		boolean imgSe = false;
		
		for(int j=0; j<IMG_EXT_ARR.length; j++){
			if(ext.equalsIgnoreCase(IMG_EXT_ARR[j])){
				imgSe = true;
				break;
			}
		}
		
		return imgSe;
	}
	
	/**
	* @method 설명 : 파일여부 확인
	* @param String 확장자
	* @return boolean 확장자 일치 여부
	* @exception 
	*/
	public static boolean seFile(String ext, String[] allowExtArray){
		boolean fileSe = false;
		
		for(int i=0; i<allowExtArray.length; i++){
			if(ext.equalsIgnoreCase(allowExtArray[i])){
				fileSe = true;
				break;
			}
		}
		
		return fileSe;
	}
	
	/**
	* @method 설명 : 파일 업로드
	* @param Map<String, Object>, MultipartHttpServletRequest
	* @return String 파일 ID
	* @exception RuntimeException, IOException
	*/
	public static List<HashMap<String, Object>> fileListUpload(String jobSe, Map<String, UploadFile[]> uploadFiles) throws RuntimeException, IOException {
		List<HashMap<String, Object>> resultList = new ArrayList<HashMap<String, Object>>();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar cal = Calendar.getInstance();
		String toDay = sdf.format(cal.getTime());
		
		//TODO property에서 업무별로 파일업로드 path 가져올 수 있도록 하여야 함
		String path = EgovProperties.getProperty("upload.temp.path");
		String dtlPath = toDay + File.separator;
		
		// 파일 디렉토리 존재여부 확인 후 없으면 생성
		File upPath = new File(path+dtlPath);
		if(!upPath.exists()){
			upPath.mkdirs();
		}
		
		for(String key : uploadFiles.keySet()) {
			UploadFile[] list = uploadFiles.get(key);
			for(int i=0; i<list.length; i++) {
				UploadFile uploadFile = list[i];
				HashMap<String, Object> resultMap = new HashMap<String, Object>();
				
				String orgFileNm = uploadFile.getFileName();							// 원본 파일 명
				String upFileExt = orgFileNm.substring(orgFileNm.lastIndexOf(".") + 1);	// 파일 확장자
				String saveFileNm = KeyHelper.getStringKey() + "." + upFileExt;			// 저장 파일명
				long fileSize = uploadFile.getFile().length();
				
				File file = uploadFile.getFile();
				File myfile = new File(path+dtlPath, saveFileNm);
				Files.copy(file.toPath(), myfile.toPath(), StandardCopyOption.REPLACE_EXISTING);
				
				resultMap.put("filePath", path+dtlPath);
				resultMap.put("orgFileNm", orgFileNm);
				resultMap.put("fileExt", upFileExt);
				resultMap.put("saveFileNm", saveFileNm);
				resultMap.put("fileSize", fileSize);
				
				resultList.add(resultMap);
			}
		}
		return resultList;
	}
}