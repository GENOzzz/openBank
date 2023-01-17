package com.test.demo.API.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.demo.API.service.AccountService;
import com.test.demo.model.TokenDTO;

@Controller
@RequestMapping(value="/account")
public class AccountRestController {
	
	@Autowired
	AccountService accountService;
	
	@PostMapping("/list")
	@ResponseBody
	private JSONObject accountList(@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException{
		return accountService.accountList(tokenDTO);
	}
	
	@PostMapping("/cancel")
	@ResponseBody
	private JSONObject accountCancel(@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException {
		System.out.println(tokenDTO);
		JSONObject result = accountService.accountCancel(tokenDTO,"inquiry");
		
		if(result.get("rsp_code")=="A000") {
			return accountService.accountCancel(tokenDTO,"transfer");
		}
		return result;
	}
	
}
