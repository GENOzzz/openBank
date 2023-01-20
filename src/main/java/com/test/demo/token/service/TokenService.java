package com.test.demo.token.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.stereotype.Service;

import com.test.demo.model.LoginDTO;
import com.test.demo.model.TokenDTO;

@Service
public class TokenService {
	
	private String dbFileUrl = "jdbc:sqlite:test.db";//DBFileLink
	
	public boolean addToken(TokenDTO tokenDTO) {
		
		Connection con = null;//connector
		Statement stmt = null;//??
		ResultSet rs = null;//??
				
		boolean result = false;
		
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("Token DB Connected!");
			
			stmt = con.createStatement();
			
			rs = stmt.executeQuery("insert into TBL_TOKEN ("
					+ "LOGIN_KEY, "
					+ "TOKEN_TYPE, "
					+ "ACCESS_TOKEN, "
					+ "REFRESH_TOKEN, "
					+ "EXPIRES_IN,"
					+ "SCOPE, "
					+ "USER_SEQ_NO, "
					+ "INPUT_KEY, "
					+ "INPUT_DATE)"
					+ "values("
					+ "2, "
					+ "'" + tokenDTO.getTokenType()+ "', "
					+ "'" + tokenDTO.getAccessToken()+"', "
					+ "'" + tokenDTO.getRefreshToken()+"', "
					+ "'" + tokenDTO.getExpiresIn()+"', "
					+ "'" + tokenDTO.getScope()+"', "
					+ "'" + tokenDTO.getUserSeqNo()+"', "
					+ "'" + tokenDTO.getInputKey() +"', "
					+ "datetime('now'));");
			
			rs.close();
			stmt.close();
			con.close();
			
			
		}catch(Exception e) {
			System.out.println(e);
		}
		
		return result;
	}
	
	public TokenDTO getToken(LoginDTO loginDTO) {
		
		TokenDTO tokenDTO = new TokenDTO();
		
		return tokenDTO;
	}
	
}
