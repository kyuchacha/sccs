package com.sys.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;

@Controller
public class UserController {

	@RequestMapping("/com/user/userMngList.do")
	public View userMngList(HttpServletRequest request, HttpServletResponse response, ModelAndView andView) throws Exception {
		return new UIView("egov-exbuilder/view/system/user/userMngList.clx");
	}

}
