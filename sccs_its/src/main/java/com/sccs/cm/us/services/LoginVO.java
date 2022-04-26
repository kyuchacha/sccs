package com.sccs.cm.us.services;

import java.io.Serializable;

/**
 * @Class Name : LoginVO.java
 * @Description : Login VO class
 * @Modification Information
 * @ @ 수정일 수정자 수정내용 @ ------- -------- --------------------------- @ 2009.03.03
 *   박지욱 최초 생성
 *
 * @author 공통서비스 개발팀 박지욱
 * @since 2009.03.03
 * @version 1.0
 * @see
 * 
 */
public class LoginVO implements Serializable {

	private static final long serialVersionUID = -8274004534207618049L;

	private String userId;
	private String roleCd;
	private String deptNm;
	private String pswdEncpt;
	private String tmprPswdEncpt;
	private String userNm;
	private String cttpcEncpt;
	private String emlEncpt;
	private String sttsCd;
	private String whdwlAplyDt;
	private String whdwlAprvDt;
	private String whdwlDtls;
	private String lgnFailrCo;
	private String lastCntnDt;
	private String regDt;
	private String regId;
	private String mdfcnDt;
	private String mdfcnId;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getRoleCd() {
		return roleCd;
	}

	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}

	public String getDeptNm() {
		return deptNm;
	}

	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}

	public String getPswdEncpt() {
		return pswdEncpt;
	}

	public void setPswdEncpt(String pswdEncpt) {
		this.pswdEncpt = pswdEncpt;
	}

	public String getTmprPswdEncpt() {
		return tmprPswdEncpt;
	}

	public void setTmprPswdEncpt(String tmprPswdEncpt) {
		this.tmprPswdEncpt = tmprPswdEncpt;
	}

	public String getUserNm() {
		return userNm;
	}

	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}

	public String getCttpcEncpt() {
		return cttpcEncpt;
	}

	public void setCttpcEncpt(String cttpcEncpt) {
		this.cttpcEncpt = cttpcEncpt;
	}

	public String getEmlEncpt() {
		return emlEncpt;
	}

	public void setEmlEncpt(String emlEncpt) {
		this.emlEncpt = emlEncpt;
	}

	public String getSttsCd() {
		return sttsCd;
	}

	public void setSttsCd(String sttsCd) {
		this.sttsCd = sttsCd;
	}

	public String getWhdwlAplyDt() {
		return whdwlAplyDt;
	}

	public void setWhdwlAplyDt(String whdwlAplyDt) {
		this.whdwlAplyDt = whdwlAplyDt;
	}

	public String getWhdwlAprvDt() {
		return whdwlAprvDt;
	}

	public void setWhdwlAprvDt(String whdwlAprvDt) {
		this.whdwlAprvDt = whdwlAprvDt;
	}

	public String getWhdwlDtls() {
		return whdwlDtls;
	}

	public void setWhdwlDtls(String whdwlDtls) {
		this.whdwlDtls = whdwlDtls;
	}

	public String getLgnFailrCo() {
		return lgnFailrCo;
	}

	public void setLgnFailrCo(String lgnFailrCo) {
		this.lgnFailrCo = lgnFailrCo;
	}

	public String getLastCntnDt() {
		return lastCntnDt;
	}

	public void setLastCntnDt(String lastCntnDt) {
		this.lastCntnDt = lastCntnDt;
	}

	public String getRegDt() {
		return regDt;
	}

	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}

	public String getRegId() {
		return regId;
	}

	public void setRegId(String regId) {
		this.regId = regId;
	}

	public String getMdfcnDt() {
		return mdfcnDt;
	}

	public void setMdfcnDt(String mdfcnDt) {
		this.mdfcnDt = mdfcnDt;
	}

	public String getMdfcnId() {
		return mdfcnId;
	}

	public void setMdfcnId(String mdfcnId) {
		this.mdfcnId = mdfcnId;
	}
}
