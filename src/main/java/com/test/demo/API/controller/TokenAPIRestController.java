package com.test.demo.API.controller;

import java.net.MalformedURLException;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.demo.API.service.InquiryService;
import com.test.demo.API.service.TokenAPIService;
import com.test.demo.model.TokenDTO;

@Controller
@RequestMapping(value="/token")
public class TokenAPIRestController {
	
	@Autowired
	TokenAPIService tokenAPIService;
	
	@PostMapping("/issue")
	@ResponseBody
	private JSONObject tokenIssue(@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException{
		System.out.println("===token issue");
		JSONObject result = tokenAPIService.tokenIssue(tokenDTO);
		System.out.println(result);
		return result;
	}	
	
}