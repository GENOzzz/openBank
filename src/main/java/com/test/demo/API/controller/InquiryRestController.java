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
import com.test.demo.model.TokenDTO;

@Controller
@RequestMapping(value="/inquiry")
public class InquiryRestController {
	
	@Autowired
	InquiryService inquiryService;
	
	@PostMapping("/balance")
	@ResponseBody
	private JSONObject inquiryBalance(@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException{
		//System.out.println("===inquiry balance");
		return inquiryService.inquiryBalance(tokenDTO);
	}
	
	@SuppressWarnings("unchecked")
	@PostMapping("/transactional")
	@ResponseBody
	private JSONObject transactional(Model model,@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException{

		JSONObject result = inquiryService.transactional(tokenDTO);
		
		result.put("inquiry_type", tokenDTO.getInquiryType());
		
		result.put("period", tokenDTO.getPeriod());
		
		return result;
	}
	
	
	
}
