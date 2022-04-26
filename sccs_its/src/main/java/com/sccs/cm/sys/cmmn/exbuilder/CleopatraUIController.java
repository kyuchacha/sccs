package com.sccs.cm.sys.cmmn.exbuilder;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;
import com.cleopatra.ui.PageGenerator;


@Controller
public class CleopatraUIController {


	public CleopatraUIController() {
	}

	/**
	 * com.cleopatra.ui.PageGenerator를 이용하여 처리할 요청 URL 패턴을 정의
	 */
	@PostConstruct
	private void initPageGenerator() {
		PageGenerator instance = PageGenerator.getInstance();
		instance.setURLSuffix(".clx");
	} 

	/**
	 * *.clx 요청에 대해 UIView를 생성하여 리턴하면
	 * eXbuilder6 플러그인에서는 배포된 eXbuilder6 프로젝트 자원 중 해당하는 파일을 찾아 화면을 출력할 수 있는 HTML을 생성하여 브라우저로 전송
	 */
	@RequestMapping(value={"*/*/*/*.clx", "/***/***/*.clx", "/***/*.clx", "/*.clx"})
	public View index(HttpServletRequest request, HttpServletResponse response) throws IOException {
		return new UIView();
	}
}
