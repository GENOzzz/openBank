package com.test.demo.test.controller;

import com.test.demo.test.service.testService;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.tags.Param;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(originPatterns ="*", allowedHeaders = "*")
@Controller
@RequestMapping("/test")
public class testController {

    @Autowired
    private testService testService;
    
    private static String returnPath = "/test";

    @GetMapping("/test")
    public String test(){
        return returnPath + "/test";
    }
    
    @GetMapping("/result")
    public String result(HttpServletRequest req,Model model){
        String code = req.getParameter("code");
        String scope = req.getParameter("scope");
        String state =req.getParameter("state");
        String clientInfo = req.getParameter("client_info");
        model.addAttribute("code", code);
        model.addAttribute("scope", scope);
        model.addAttribute("state",state);
        model.addAttribute("clientInfo", clientInfo);
        return returnPath + "/result";
    }
    
    @GetMapping("/tokken")
    public String tokken() {
    	return returnPath + "/tokken";
    }
    
    @GetMapping("/prg")
    public String prg() {
    	System.out.println("test PRG get");
    	return returnPath+"/prg";
    }
}
