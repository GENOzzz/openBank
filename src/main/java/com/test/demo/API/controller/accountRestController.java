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
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping(value="/account")
public class accountRestController {
	
	@PostMapping("/list")
	@ResponseBody
	private JSONObject test(Model model) throws MalformedURLException{
		final String uri = "https://testapi.openbanking.or.kr/v2.0/account/list?user_seq_no=1101018571&include_cancel_yn=N&sort_order=D";
		
		JSONObject jsonObj = null;
		
		URL url = new URL(uri);

		  ObjectMapper mapper = new ObjectMapper();
		  mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		  StringBuilder sb = new StringBuilder();
		  BufferedReader br;

		 List<Map<String,Object>> listMap = new ArrayList< Map<String,Object> >();

		  try {
		    HttpURLConnection con = (HttpURLConnection)url.openConnection();

		    //Request Header 정의
		    con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		    
		    con.setRequestProperty("Authorization", "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAxMDE4NTcxIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2ODE2MjcwMzIsImp0aSI6ImNmYjIzOWJkLWRlOWQtNGY2Yy05NTMzLTA5MmM2YmY4NjdkOCJ9.zgdq3KWfDG6S6NQRJ4UZrog_T2V8b-7Lb7bWj6dxfIU");
		    
		    //전송방식
		    con.setRequestMethod("GET");

		    //서버에 연결되는 Timeout 시간 설정
		    con.setConnectTimeout(5000);

		    //InputStream 읽어 오는 Timeout 시간 설정
		    con.setReadTimeout(5000); 

		    //URLConnection에 대한 doOutput 필드값을 지정된 값으로 설정한다. 
		    //URL 연결은 입출력에 사용될 수 있다. 
		    //URL 연결을 출력용으로 사용하려는 경우 DoOutput 플래그를 true로 설정하고, 
		    //그렇지 않은 경우는 false로 설정해야 한다. 기본값은 false이다.
		    con.setDoOutput(false); 

		    if (con.getResponseCode() == HttpURLConnection.HTTP_OK) {
		      br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
		      String line;
		      while ((line = br.readLine()) != null) {
		      sb.append(line).append("\n");
		      }
		      br.close();
		      System.out.println(sb.toString());
		      
		      JSONParser parser = new JSONParser();
		      Object obj = parser.parse(sb.toString());
		      jsonObj = (JSONObject)obj;
		      
		      mapper.readValue(sb.toString(), new TypeReference<List<Map<String, Object>>>(){});
		      model.addAttribute("listMap", listMap);
		      
		    } else {
		    	model.addAttribute("error", con.getResponseMessage());
		    }
		  } catch (Exception e) {
		  	System.err.println(e.toString());
		  }
		  
		  return jsonObj;
	}
}
