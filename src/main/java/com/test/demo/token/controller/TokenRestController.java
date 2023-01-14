package com.test.demo.token.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.demo.model.TokenDTO;
import com.test.demo.token.service.TokenService;

@Controller
@RequestMapping("/token")
public class TokenRestController {
	
	@Autowired
	TokenService tokenService;
	
	/**
	 * @methodName : tokenAccess
	 * @methodExplanation : add token to token table
	
	 * @date : 2023. 1. 13.
	 * @author : PHH
	 * @param tokenDTO
	 */
	@PostMapping("/access")
	@ResponseBody
	public boolean tokenAccess(@ModelAttribute TokenDTO tokenDTO){
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		System.out.println(tokenDTO.toString());
		tokenDTO.setInputKey(0);
		tokenService.addToken(tokenDTO);
		return true;
	}
}
