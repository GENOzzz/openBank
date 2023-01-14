package com.test.demo.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginDTO extends CommonDTO{
	private Integer loginKey;
	private String loginId;
	private String loginPassword;
	private boolean loginResult;
}
