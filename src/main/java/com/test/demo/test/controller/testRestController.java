package com.test.demo.test.controller;

import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.demo.test.service.testService;

@Controller
@RequestMapping(value="/test")
public class testRestController {
	private static String returnPath="/test";
	
	@PostMapping("/result")
	private void test() {
		System.out.println("REST TEST");
	}
	
	@PostMapping("/prg")
	private String prg() {
		System.out.println("test PRG post");
		return "redirect:/test/prg";
	}
	
	@PostMapping("/test")
	@ResponseBody
	private JSONObject testAPI(HttpServletRequest req) throws MalformedURLException {
		
		StringBuffer sb = req.getRequestURL();
		
		System.out.println(sb);
		
		
		String string = sb.toString();
		
		URL url = new URL(string);
		
		String hostName = url.getHost() +":"+url.getPort();
		
		System.out.println(hostName);
		
		return null;
		
		//return testService.testAPI();
	}
}
