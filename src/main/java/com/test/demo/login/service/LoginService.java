package com.test.demo.login.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.test.demo.model.LoginDTO;
import com.test.demo.model.TokenDTO;

@Service
public class LoginService {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	private String dbFileUrl = "jdbc:sqlite:test.db";//DBFileLink
	
	public TokenDTO loginDo(LoginDTO loginDTO) {
		Connection con = null;//connector
		Statement stmt = null;//??
		ResultSet rs = null;//??
				
		TokenDTO tokenDTO = new TokenDTO();
		
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("SQLite DB Connected!");
			
			stmt = con.createStatement();
			
			rs = stmt.executeQuery("select "
					+ "LOGIN_ID,"
					+ "LOGIN_PASSWORD, "
					+ "ACCESS_TOKEN, "
					+ "REFRESH_TOKEN, "
					+ "USER_SEQ_NO "
					+ "from TBL_LOGIN tl "
					+ "left join TBL_TOKEN tt on tl.LOGIN_KEY = tt.LOGIN_KEY");

			while(rs.next()) {
				if(passwordEncoder.matches(loginDTO.getLoginPassword(), rs.getString("LOGIN_PASSWORD"))) {
					tokenDTO.setLoginResult(true);
					tokenDTO.setAccessToken(rs.getString("ACCESS_TOKEN"));
					tokenDTO.setRefreshToken(rs.getString("REFRESH_TOKEN"));
					tokenDTO.setUserSeqNo(rs.getString("USER_SEQ_NO"));
				}
			}
			
			rs.close();
			stmt.close();
			con.close();
			
			
		}catch(Exception e) {
			System.out.println(e);
		}
		
		return tokenDTO;
	}
	
}