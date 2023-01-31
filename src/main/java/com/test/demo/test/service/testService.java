package com.test.demo.test.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.ParameterMetaData;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class testService {
    public String service(){
        return "Service !!!";
    }

	public static JSONObject testAPI() throws MalformedURLException {
		System.out.println("demo test service call @@@");
		final String uri = "http://192.168.0.150:8080/test/test";
		
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
		    
		    con.setRequestProperty("called", "called data");
		    
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
		    con.setDoOutput(true);
		    //JSONObject param = (JSONObject) parser.parse("{\"userId\": \"1\", \"Id\": \"2\"}");
		    String param = "{\"userId\": \"bbb\" , \"id\": \"aaa\"}";
		    try(OutputStream os = con.getOutputStream()){
		    	byte request_data[] = param.getBytes();
		    	os.write(request_data);
		    	os.close();
		    }catch(Exception e){
		    	e.printStackTrace();
		    }
		    
		    
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
		    	jsonObj = (JSONObject) parser.parse("{\"error\": \"error\"}");
		    }
		  } catch (Exception e) {
		  	System.err.println(e.toString());
		  }
		  
		  return jsonObj;
	}
}
