package com.test.demo.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TokenDTO extends LoginDTO{
	private Integer tokenKey;
	private String tokenType;
	private String accessToken;
	private String refreshToken;
	private String expiresIn;
	private String scope;
	private String userSeqNo;
	
	private String fintechUseNum;
	private String bankTranId;
}
