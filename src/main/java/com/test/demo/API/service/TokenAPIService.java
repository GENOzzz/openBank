package com.test.demo.API.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.demo.model.TokenDTO;

@Service
public class TokenAPIService {
	
	public JSONObject tokenIssue(TokenDTO tokenDTO,HttpServletRequest req) throws MalformedURLException, UnknownHostException {
		System.out.println("===token issue service");
		
		StringBuffer urlSb = req.getRequestURL();
		String urlString = urlSb.toString();
		URL reqUrl = new URL(urlString);
		String hostName = reqUrl.getHost() +":"+reqUrl.getPort();
		
		
		final String uri = "https://testapi.openbanking.or.kr/oauth/2.0/token?"
				+ "code="+tokenDTO.getCode()+"&"
				+ "client_id=39965b53-c3e4-46a3-8c1b-55180370d35d&"
				+ "client_secret=c8923354-b9d7-430a-915f-a609b27c9de6&"
				+ "redirect_uri=http://" + hostName + "/main&"
				+ "grant_type=authorization_code";
		
		JSONObject jsonObj = null; 																															
		JSONParser parser = new JSONParser();
		
		URL url = new URL(uri);

		  ObjectMapper mapper = new ObjectMapper();
		  mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		  StringBuilder sb = new StringBuilder();
		  BufferedReader br;

		  try {
		    HttpURLConnection con = (HttpURLConnection)url.openConnection();
		    
		    //Request Header 정의
		    //con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		    
		    //con.setRequestProperty("Authorization", "Bearer "+tokenDTO.getAccessToken());
		    
		    //전송방식
		    con.setRequestMethod("POST");

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
		      //System.out.println(sb.toString());
		      
		      Object obj = parser.parse(sb.toString());
		      jsonObj = (JSONObject)obj;
		      
		      
		    } else {
		    	Map <String,String> map = new HashMap<String,String>();
		    	map.put("rsp_code", "O0001");
		    	map.put("rsp_message", "token issue fail");
		    	jsonObj = new JSONObject(map);
		    }
		  } catch (Exception e) {
		  	System.err.println(e.toString());
		  }
		  
		  return jsonObj;
	}

}
