package com.test.demo.API.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.test.demo.model.TokenDTO;

@Service
public class InquiryService {
	
	public JSONObject inquiryBalance(TokenDTO tokenDTO) throws MalformedURLException {
		
		Date now = new Date();
		
		SimpleDateFormat tranIdFormat = new SimpleDateFormat("HHmmssSSS");
		String tranIdTime = tranIdFormat.format(now);
		final String bankTranId = tokenDTO.getBankTranId()+"U"+tranIdTime; //이용기관코드
		
		SimpleDateFormat tranDtimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String dTime = tranDtimeFormat.format(now);
				
		
		final String uri = "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num?bank_tran_id="+bankTranId+"&fintech_use_num="+tokenDTO.getFintechUseNum()+"&tran_dtime="+dTime;
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
		    con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		    
		    con.setRequestProperty("Authorization", "Bearer "+tokenDTO.getAccessToken());
		    
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

	public JSONObject transactional(TokenDTO tokenDTO) throws MalformedURLException {
		Date now = new Date();
		
		SimpleDateFormat tranIdFormat = new SimpleDateFormat("HHmmssSSS");
		String tranIdTime = tranIdFormat.format(now);
		final String bankTranId = tokenDTO.getBankTranId()+"U"+tranIdTime; //이용기관코드
		
		SimpleDateFormat tranDtimeFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String dTime = tranDtimeFormat.format(now); //요청일시
		
		SimpleDateFormat toDateFormat = new SimpleDateFormat("yyyyMMdd");
		String toDate = toDateFormat.format(now); //오늘
		
		SimpleDateFormat toTimeFormat = new SimpleDateFormat("HHmmss");
		String toTime = toTimeFormat.format(now); //현재시간
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(now);
		String fromDate ;
		
		cal.add(Calendar.YEAR, -10);
		fromDate = toDateFormat.format(cal.getTime());
		
		//기간 기준 10년
		/*if(!tokenDTO.getPeriod().equals("all") && !tokenDTO.getPeriod().equals("undefined") && tokenDTO.getPeriod()!=null) {
			cal.add(Calendar.DATE, -Integer.parseInt(tokenDTO.getPeriod()));
			fromDate = toDateFormat.format(cal.getTime());
		}else {
			cal.add(Calendar.YEAR, -10);
			fromDate = toDateFormat.format(cal.getTime());
		}*/
		
		String inquiryType="A";
		if(tokenDTO.getInquiryType()!=null) {
			inquiryType=tokenDTO.getInquiryType();
		}
		
		final String uri = "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num?"
				+ "bank_tran_id="+bankTranId+"&"
						+ "fintech_use_num="+tokenDTO.getFintechUseNum()+"&"
								+ "inquiry_base=D&"
								+ "inquiry_type="+inquiryType+"&"
								+ "from_date="+fromDate+"&"
								+ "from_time=000000&"
								+ "to_date="+toDate+"&"
										+ "to_time="+toTime+"&"
										+ "sort_order=D&"
										+ "tran_dtime="+dTime;
		
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
		    con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		    
		    con.setRequestProperty("Authorization", "Bearer "+tokenDTO.getAccessToken());
		    
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
