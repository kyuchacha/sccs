package com.sccs.cm.sys.cmmn.util;

import java.math.BigInteger;
import java.security.MessageDigest;

/**
 * SHA256, SHA512
 * 
 * @author cjlee
 */
public class SHA2Util {

	/**
	 * SHA256 변환 후 값 취득
	 * @param input
	 * @return
	 */
	public static String getSHA256(String input) {

		String toReturn = null;
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			digest.reset();
			digest.update(input.getBytes("utf8"));
			toReturn = String.format("%064x", new BigInteger(1, digest.digest()));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return toReturn;
	}

	/**
	 * SHA512 변환 후 값 취득
	 * @param input
	 * @return
	 */
	public static String getSHA512(String input) {

		String toReturn = null;
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-512");
			digest.reset();
			digest.update(input.getBytes("utf8"));
			toReturn = String.format("%0128x", new BigInteger(1, digest.digest()));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return toReturn;
	}
}