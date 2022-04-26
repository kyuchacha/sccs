package com.sccs.cm.sys.cmmn.util;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.http.MediaType;
import org.springframework.util.Assert;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

/**
 * MultipartResolver
 * @author cjlee
 */
public class XSSCommonsMultipartResolver extends CommonsMultipartResolver {
	
	private boolean resolveLazily = false;
	
    /**
     * XSS 처리
     * @param value
     * @return
     */
    private String cleanXSS(String value) {  
    	value = Util.removeXSS(value, true);
        return value;  
    }  
    
    /* (non-Javadoc)
     * @see org.springframework.web.multipart.commons.CommonsMultipartResolver#resolveMultipart(javax.servlet.http.HttpServletRequest)
     */
    @Override
	public MultipartHttpServletRequest resolveMultipart(final HttpServletRequest request) throws MultipartException {
		Assert.notNull(request, "Request must not be null");
		if (this.resolveLazily) {
			return new DefaultMultipartHttpServletRequest(request) {
				@Override
				protected void initializeMultipart() {
					MultipartParsingResult parsingResult = parseRequest(request);
					setMultipartFiles(parsingResult.getMultipartFiles());
					setMultipartParameters(parsingResult.getMultipartParameters());
				}
			};
		}
		else {
			MultipartParsingResult parsingResult = parseRequest(request);
			Map<String, String[]> parameters = parsingResult.getMultipartParameters();
			Map<String, String[]> XSSparameters = new HashMap<String, String[]>();
			
			// parameter XSS처리
			for ( String strKey : parameters.keySet()) {
				if (strKey.equals("mid")) {
					String[] midValue = {parameters.get(strKey)[0]};
					XSSparameters.put(strKey, midValue);					
				} else {
					String [] xssValues = new String[parameters.get(strKey).length];
				    for (int i = 0; i < parameters.get(strKey).length; i++) {  
				    	xssValues[i] = cleanXSS(parameters.get(strKey)[i]);
				    }    
				    XSSparameters.put(strKey, xssValues);	  
				}
			}
			//TODO null 입력 관련 확인 필요
			return new DefaultMultipartHttpServletRequest(
					request, parsingResult.getMultipartFiles(), XSSparameters, null);
		}
	}
    
	/**
	 * Parse the given servlet request, resolving its multipart elements.
	 * @param request the request to parse
	 * @return the parsing result
	 * @throws MultipartException if multipart resolution failed.
	 */
	@SuppressWarnings("unchecked")
	protected MultipartParsingResult parseRequest(HttpServletRequest request) throws MultipartException {
		String encoding = determineEncoding(request);
		FileUpload fileUpload = prepareFileUpload(encoding);
		try {
			List<FileItem> fileItems = ((ServletFileUpload) fileUpload).parseRequest(request);
			return parseFileItems(fileItems, encoding);
		}
		catch (FileUploadBase.SizeLimitExceededException ex) {
			throw new MaxUploadSizeExceededException(fileUpload.getSizeMax(), ex);
		}
		catch (FileUploadException ex) {
			throw new MultipartException("Could not parse multipart servlet request", ex);
		}
	}

	/**
	 * Parse the given List of Commons FileItems into a Spring MultipartParsingResult,
	 * containing Spring MultipartFile instances and a Map of multipart parameter.
	 * @param fileItems the Commons FileIterms to parse
	 * @param encoding the encoding to use for form fields
	 * @return the Spring MultipartParsingResult
	 * @see CommonsMultipartFile#CommonsMultipartFile(org.apache.commons.fileupload.FileItem)
	 */
	@Override
	protected MultipartParsingResult parseFileItems(List<FileItem> fileItems, String encoding) {
		MultiValueMap<String, MultipartFile> multipartFiles = new LinkedMultiValueMap<String, MultipartFile>();
		Map<String, String[]> multipartParameters = new HashMap<String, String[]>();

		// Extract multipart files and multipart parameters.
		for (FileItem fileItem : fileItems) {
			if (fileItem.isFormField() && fileItem.getFieldName().indexOf("uploadFile") < 0) {
				String value;
				String partEncoding = determineEncoding(fileItem.getContentType(), encoding);
				if (partEncoding != null) {
					try {
						value = fileItem.getString(partEncoding);
					}
					catch (UnsupportedEncodingException ex) {
						if (logger.isWarnEnabled()) {
							logger.warn("Could not decode multipart item '" + fileItem.getFieldName() +
									"' with encoding '" + partEncoding + "': using platform default");
						}
						value = fileItem.getString();
					}
				}
				else {
					value = fileItem.getString();
				}
				String[] curParam = multipartParameters.get(fileItem.getFieldName());
				if (curParam == null) {
					// simple form field
					multipartParameters.put(fileItem.getFieldName(), new String[] {value});
				}
				else {
					// array of simple form fields
					String[] newParam = StringUtils.addStringToArray(curParam, value);
					multipartParameters.put(fileItem.getFieldName(), newParam);
				}
			}
			else {
				CommonsMultipartFile file = new CommonsMultipartFile(fileItem);
				multipartFiles.add(file.getName(), file);
				if (logger.isDebugEnabled()) {
					logger.debug("Found multipart file [" + file.getName() + "] of size " + file.getSize() +
							" bytes with original filename [" + file.getOriginalFilename() + "], stored " +
							file.getStorageDescription());
				}
			}
		}
		
		//TODO null 입력 관련 확인 필요
		return new MultipartParsingResult(multipartFiles, multipartParameters, null);
	}
	
	/**
	 * determineEncoding
	 * @param contentTypeHeader
	 * @param defaultEncoding
	 * @return
	 */
	private String determineEncoding(String contentTypeHeader, String defaultEncoding) {
		if (!StringUtils.hasText(contentTypeHeader)) {
			return defaultEncoding;
		}
		MediaType contentType = MediaType.parseMediaType(contentTypeHeader);
		Charset charset = contentType.getCharSet();
		return charset != null ? charset.name() : defaultEncoding;
	}
}