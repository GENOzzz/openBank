package com.test.demo.main;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MainDTO {
	
	private String code;
	private String clientId;
	private String clientSecret;
	private String grantType;
	private String accessToken;
	private String refreshToken;
	private String userSeqNo;
}
