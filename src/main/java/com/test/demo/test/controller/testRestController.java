package com.test.demo.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping(value="/test")
public class testRestController {
	private static String returnPath="/test";
	
	@PostMapping("/result")
	private void test() {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@ REST TEST");
	}
	
	@PostMapping("/prg")
	private String prg() {
		System.out.println("test PRG post");
		return "redirect:/test/prg";
	}
}
