package com.test.demo.login.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.demo.login.service.LoginService;
import com.test.demo.model.LoginDTO;
import com.test.demo.model.TokenDTO;

@Controller
@RequestMapping("/login")
public class LoginRestController {
	
	@Autowired
	LoginService loginService;
	
	@PostMapping("/do")
	@ResponseBody
	public Map<String,Object> login(@ModelAttribute LoginDTO loginDTO) {	
		
		Map<String,Object> map = new HashMap<String,Object>();
		TokenDTO tokenDTO = loginService.loginDo(loginDTO);
		map.put("tokenDTO", tokenDTO);
		
		return map;
	}
}
