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
			System.out.println("LOGIN DB CONNECT");
			
			stmt = con.createStatement();
			
			rs = stmt.executeQuery("select "
					+ "LOGIN_ID,"
					+ "LOGIN_PASSWORD, "
					+ "ACCESS_TOKEN, "
					+ "REFRESH_TOKEN, "
					+ "USER_SEQ_NO, "
					+ "tt.UPDATE_DATE "
					+ "from TBL_LOGIN tl "
					+ "left join TBL_TOKEN tt on tl.LOGIN_KEY = tt.LOGIN_KEY "
					+ "where "
					+ "LOGIN_ID = '"+loginDTO.getLoginId()+"';");

			while(rs.next()) {
				if(passwordEncoder.matches(loginDTO.getLoginPassword(), rs.getString("LOGIN_PASSWORD"))) {
					tokenDTO.setLoginResult(true);
					tokenDTO.setLoginId(rs.getString("LOGIN_ID"));
					tokenDTO.setAccessToken(rs.getString("ACCESS_TOKEN"));
					tokenDTO.setRefreshToken(rs.getString("REFRESH_TOKEN"));
					tokenDTO.setUserSeqNo(rs.getString("USER_SEQ_NO"));
					tokenDTO.setUpdateDate(rs.getString("UPDATE_DATE"));
				}else {
					tokenDTO.setLoginResult(false);
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
	
public LoginDTO getLoginMember(String loginId) {
		
		Connection con = null;//connector
		Statement stmt = null;//??
		ResultSet rs = null;//??
		
		LoginDTO loginDTO = new LoginDTO();
		
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
					+ "left join TBL_TOKEN tt on tl.LOGIN_KEY = tt.LOGIN_KEY "
					+ "where "
					+ "LOGIN_ID = '"+loginId+"';");
			
			while(rs.next()) {
				loginDTO.setLoginId(rs.getString("login_id"));
				loginDTO.setLoginPassword(rs.getString("login_passwork"));
			}
			
			rs.close();
			stmt.close();
			con.close();
			
			
		}catch(Exception e) {
			System.out.println(e);
		}
		
		if(loginDTO.getLoginId()!="") {
			return loginDTO;			
		}else {
			return null;
		}
		
	}
	
}
