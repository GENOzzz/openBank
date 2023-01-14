package com.test.demo.main.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.demo.model.TokenDTO;

/**
 * @packageName com.test.demo.main.controller
 * @fileName MainController.java
 * @author root
 * @date 2023. 1. 11.
* =====================================
 * DATE         |AURHOR    |NOTE
 * =====================================
 * 2023. 1. 11. |PHH       |최초생성
 */
@Controller
@RequestMapping("/main")
public class MainRestController {
	
	/**
	 * @methodName : main
	 * @methodExplanation : get main page
	 * @date : 2023. 1. 11.
	 * @author : PHH
	 * @param req
	 * @param model
	 * @return
	 */
	@PostMapping("")
	public String main(HttpServletRequest req,Model model,@ModelAttribute TokenDTO tokenDTO){
		System.out.println("MAIN POST CONTROLLER");
		System.out.println(tokenDTO.toString());
		if(tokenDTO.getAccessToken()!=null) {
			model.addAttribute("accessToken",tokenDTO.getAccessToken());
			model.addAttribute("refreshToken",tokenDTO.getRefreshToken());
		}
        
       return "redirect:/main";
	}
}
