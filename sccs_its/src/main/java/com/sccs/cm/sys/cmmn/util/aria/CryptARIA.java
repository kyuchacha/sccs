package com.sccs.cm.sys.cmmn.util.aria;

import java.util.ArrayList;
import java.util.List;

import egovframework.rte.psl.dataaccess.util.EgovMap;

public class CryptARIA {

	// 암호화(data, key)
	public static String encryptkey(String data, String key) {
		try {

			if (data.length() == 0 || "".equals(data)) {
				return "";
			}

			/**
			 * 암호키생성
			 */
			byte[] masterKey = new byte[32];
			masterKey = key.getBytes();
			/**
			 * Aria 초기화
			 */
			CryptoARIA aria256 = new CryptoARIA(masterKey);

			/**
			 * 복호화
			 */
			data = aria256.encrypt(data);

			// System.out.println("암호 : " + data + ", length : " +
			// data.length());
		} catch (Exception e) {
			// System.out.println("암호화 에러 : " + e);
		}

		return data;
	}

	// 복호화(data, key)
	public static String decryptkey(String data, String key) {
		try {
			if (data == null || data.length() == 0 || data == "null") {
				return "";
			}

			/**
			 * 암호키 생성
			 */
			byte[] masterKey = new byte[32];
			masterKey = key.getBytes();

			/**
			 * Aria 초기화
			 */
			CryptoARIA aria256 = new CryptoARIA(masterKey);

			/**
			 * 복호화
			 */
			data = aria256.decrypt(data);

			// System.out.println("복호 : " + data + ", length : " +
			// data.length());
		} catch (Exception e) {
			// System.out.println("복호화 에러 : " + e);
		}

		return data;
	}

	// 복호화 List<EgovMap>(List<EgovMap>, targetColumn[], key)
	public static List decryptkeyListEgovMap(List listMap, String targetColumnList[], String key) {
		List<EgovMap> temp = new ArrayList();
		try {
			temp = listMap;
			for (EgovMap map : temp) {
				for (String column : targetColumnList) {
					String tempColumn = String.valueOf(map.get(column));
					map.put(column, decryptkey(tempColumn, key));
				}
			}
		} catch (Exception e) {

		}
		return temp;
	}

	// 암호화 List<EgovMap>(List<EgovMap>, targetColumn[], key)
	public static List encryptkeyListEgovMap(List listMap, String targetColumnList[], String key) {
		List<EgovMap> temp = new ArrayList();
		try {
			temp = listMap;
			for (EgovMap map : temp) {
				for (String column : targetColumnList) {
					String tempColumn = String.valueOf(map.get(column));
					map.put(column, encryptkey(tempColumn, key));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return temp;
	}

}
