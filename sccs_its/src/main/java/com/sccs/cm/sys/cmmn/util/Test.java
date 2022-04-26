package com.sccs.cm.sys.cmmn.util;

import com.sccs.cm.sys.cmmn.util.TransLocalPointUtil.LatXLngY;

public class Test {
	public static void main(String args[]) {
		LatXLngY a = TransLocalPointUtil.convertGRID_GPS(TransLocalPointUtil.TO_GRID, 36.4987531567432, 127.310678329828);
		LatXLngY aa = TransLocalPointUtil.convertGRID_GPS(TransLocalPointUtil.TO_GRID, 37.69118611111111, 126.78337499999999);
		LatXLngY aaa = TransLocalPointUtil.convertGRID_GPS(TransLocalPointUtil.TO_GRID, 33.500946412305076, 126.54663058817043);
		System.out.println(">> 위도 : " + a.x + ", 경도 : "+ a.y);
		System.out.println(">> 위도 : " + aa.x + ", 경도 : "+ aa.y);
		System.out.println(">> 위도 : " + aaa.x + ", 경도 : "+ aaa.y);
	}
}
