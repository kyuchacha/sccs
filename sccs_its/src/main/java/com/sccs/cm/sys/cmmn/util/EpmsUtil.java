package com.sccs.cm.sys.cmmn.util;

/**
 * Epms 전용 UTIL
 * @author cjlee
 */
public class EpmsUtil {
	
	/**
	 * 다음 ASCII Code 취득
	 * @param rCurrentCode
	 * @param rLength
	 * @return
	 */
	public static String getNextASCIICode(String rCurrentCode, int rLength) {
		
		String xReturn = "";
		
		try {
			
			if (!"".equals(rCurrentCode) && rCurrentCode.length() == rLength) {
				
				// 증가시킬 번호의 자릿수 만큼 Char 배열로 정의
				char[] xArrChr = rCurrentCode.toCharArray();

				// 뒷자리 부터 역순으로 계산
				for (int i = xArrChr.length - 1; i > -1; i--) {
					
					if (xArrChr[i] == 'Z') {
						// 자릿수가 Z 이면 0으로 초기화 하고 상위 자릿수 연산
						xArrChr[i] = '0';
					} else if (xArrChr[i] == '9') {
						// 지정 자릿수가 9 이면 A 로 증가후 for 종료
						xArrChr[i] = 'A';
						break;
					} else {
						// 지정자릿수를 ascii로 변환하여 증가 시킨후 for 종료
						int xInt = (int)xArrChr[i] + 1;
						xArrChr[i] = (char)xInt;
						break;
					}
				}

				// 연산된 자릿값을 에 반영
				for (char xChr : xArrChr) {
					xReturn += xChr;
				}
			} else {
				
				for (int i = 0; i < rLength; i++) {
					
					if ((rLength - 1) == i) {
						xReturn += "1";
					} else {
						xReturn += "0";
					}
				}
			}
		} catch (Exception ex) {
			throw ex;
		}
		
		return xReturn;
	}
}