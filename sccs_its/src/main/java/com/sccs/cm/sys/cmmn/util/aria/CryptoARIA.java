//
//  ARIA.java
//
//  A pure Java implementation of ARIA
//  following the official ARIA specification at
//
//
//  Created by Aaram Yun on 2005. 11. 30.
//  Copyright 2005 NSRI. All rights reserved.
//

package com.sccs.cm.sys.cmmn.util.aria;

import java.security.InvalidKeyException;

public class CryptoARIA {
	/**
	 * ARIACrypt
	 */
	public CryptoARIA(byte[] masterKey) throws Exception {
		if (instance == null) {
			instance = new ARIAEngine(256);
			instance.setKey(masterKey);
			instance.setupRoundKeys();
		}
	}

	ARIAEngine instance = null;

	public String encrypt(String data) throws Exception {
		if (data == null)
			return null;
		byte[] raw = make128DataBlock(data);
		byte[] encrypt_data = make128EncryptBlock(raw);
		byte[] encrypt_base64 = Base64.encode(encrypt_data);
		return "[ARIA256]" + new String(encrypt_base64).trim();
	}

	public String decrypt(String encrypt_data) throws Exception {
		if (encrypt_data == null)
			return null;
		String encrypt_base64_str = encrypt_data;
		if (isEncryptData(encrypt_data)) {
			encrypt_base64_str = encrypt_data.substring(9);
		}
		byte[] encrypt_base64 = Base64.decode(encrypt_base64_str.getBytes("EUC_KR"));
		byte[] decrypt_data = make128DecryptBlock(encrypt_base64);

		int last_pos = decrypt_data.length;
		for (int i = decrypt_data.length - 1; i >= 0; i--) {
			if (decrypt_data[i] != 0x00)
				continue;
			last_pos = i;
		}
		return new String(decrypt_data, 0, last_pos, "EUC_KR");
	}

	public boolean isEncryptData(String d) {
		if (d == null)
			return false;
		else
			return d.startsWith("[ARIA256]");
	}

	/*************************************************
	 * 이경원 추가
	 */

	private byte[] make128DataBlock(String data) throws Exception {
		byte[] data_raw_org = data.getBytes("EUC_KR");

		byte[] data_raw = new byte[((data_raw_org.length / 16) + 1) * 16];
		for (int i = 0; i < data_raw.length; i++) {
			if (i < data_raw_org.length)
				data_raw[i] = data_raw_org[i];
			else
				data_raw[i] = 0x00;
		}
		return data_raw;
	}

	private byte[] make128EncryptBlock(byte[] data) throws InvalidKeyException {
		byte[] encrypt_data = new byte[data.length];
		for (int i = 0; i < data.length; i = i + 16) {
			instance.encrypt(data, i, encrypt_data, i);
		}
		return encrypt_data;
	}

	private byte[] make128DecryptBlock(byte[] encrypt_data) throws InvalidKeyException {
		byte[] decrypted = new byte[encrypt_data.length];
		for (int i = 0; i < encrypt_data.length; i = i + 16) {
			instance.decrypt(encrypt_data, i, decrypted, i);
		}
		return decrypted;
	}

}
