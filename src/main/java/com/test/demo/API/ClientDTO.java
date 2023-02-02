package com.test.demo.API;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ClientDTO {
	
	private String clientId;
	private String clientSecret;
	private String bankTranId;
	
	public ClientDTO() {
		this.clientId ="acdd1b81-831f-41b2-a171-0e00aa92d3b4"; 
		this.clientSecret ="7531547f-084f-416c-bf08-f0103a3439a0"; 
		this.bankTranId="M202300247";
	}
}
