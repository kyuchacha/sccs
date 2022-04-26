package com.sccs.cm.sys.cmmn.quartz;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

public class TimeCheckJob {

	public void currentTimePrt() throws Exception{
		System.out.println("TimeCheckJob : " +
				new SimpleDateFormat("yyyy/MM/dd hh:mm:ss").format(new Date()));
	}

}
