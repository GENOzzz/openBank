package com.test.demo.token.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.demo.model.LoginDTO;
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
		System.out.println("=== token access");
		//System.out.println(tokenDTO.toString());
		tokenDTO.setInputKey(0);
		tokenDTO.setLoginKey(2);
		return tokenService.addToken(tokenDTO);
	}
	
	/**
	
	- @methodName tokenUpdate
	- @date 2023.02.01
	- @author root
	- @param tokenDTO
	- @return
	- @description 계좌추가등록 시 update
	*/
	@PostMapping("/update")
	@ResponseBody
	public boolean tokenUpdate(@ModelAttribute TokenDTO tokenDTO){
		System.out.println("=== token update");
		//System.out.println(tokenDTO.toString());
		tokenDTO.setLoginKey(2);
		return tokenService.updateToken(tokenDTO);
	}
	
}
