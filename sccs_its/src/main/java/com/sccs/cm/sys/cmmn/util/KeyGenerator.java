package com.sccs.cm.sys.cmmn.util;

/**
 * KeyGenerator
 * @author cjlee
 */
public class KeyGenerator implements IKeyGenerator {
	
	private int data = 0;

	/* (non-Javadoc)
	 * @see com.cmmn.util.IKeyGenerator#getStringKey(java.lang.String)
	 */
	public String getStringKey(String division) {
		try {
			Thread.sleep(1);
		} catch (InterruptedException e) {
			LogUtil.printLog(e);
		}
		
		String key = Long.toHexString(System.currentTimeMillis()) + "";
		if (data == 9)
		{
			data = 0;
		}
		data++;
		key = key + data;

		if ("".equals(division))
			return key;
		else
			return division + key.substring(1);
	}
	
	/* (non-Javadoc)
	 * @see com.cmmn.util.IKeyGenerator#getStringKey()
	 */
	public String getStringKey() {
		return getStringKey("");
	}

	/**
	 * 키생성
	 * @param division
	 * @return
	 */
	public String stringMakeKey(String division) {
		
		try {
			Thread.sleep(1);
		} catch (InterruptedException e) {
			LogUtil.printLog(e);
		}
		long key = System.currentTimeMillis();

		if ("".equals(division))
			return Long.toString(key);
		else
			return division + Long.toString(key).substring(1);
	}

	/* (non-Javadoc)
	 * @see com.cmmn.util.IKeyGenerator#getDateStringKey()
	 */
	public String getDateStringKey () {
		return getDateStringKey("");
	}

	/* (non-Javadoc)
	 * @see com.cmmn.util.IKeyGenerator#getDateStringKey(java.lang.String)
	 */
	public String getDateStringKey (String division) {
		int i = (int) System.currentTimeMillis() & 0xffffffff;
		String key = Long.toHexString(i);
		key = DateUtil.getSysDate() + "-" + key.substring(2);
		try {
			Thread.sleep(20);
		} catch (InterruptedException e) {
			LogUtil.printLog(e);
		}
		return division + key;
	}
}