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
		System.out.println("===inquiry balance");
		return inquiryService.inquiryBalance(tokenDTO);
	}
	
	@PostMapping("/transactional")
	@ResponseBody
	private JSONObject transactional(Model model,@ModelAttribute TokenDTO tokenDTO) throws MalformedURLException{
		System.out.println("===inquiry transctional");
		JSONObject result = inquiryService.transactional(tokenDTO);
		/*if(result.get("rsp_code")=="A000") {
			model.addAttribute("rsp_list",result.get("rsp_list"));
		}*/
		return result;
	}
	
	
	
}
