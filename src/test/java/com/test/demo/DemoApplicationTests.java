package com.test.demo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.test.demo.model.LoginDTO;
import com.test.demo.model.TokenDTO;

@SpringBootTest
class DemoApplicationTests {
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Test
	void testTime() {
		Date now = new Date();
		
		SimpleDateFormat format = new SimpleDateFormat("HHmmssSSS");
		
		String time = format.format(now);
		
		System.out.println(time);
		
	}
	
	//@Test
	void contextLoads() {
		Connection con = null;//connector
		Statement stmt = null;//??
		ResultSet rs = null;//??
		
		String dbFileUrl = "jdbc:sqlite:test.db";// DB FILE LINK
		
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("SQLite DB Connected!");
			
			stmt = con.createStatement();
			
			LoginDTO loginDTO = new LoginDTO();
			
			loginDTO.setLoginId("test");
			
			rs = stmt.executeQuery("select "
					+ "LOGIN_ID,"
					+ "LOGIN_PASSWORD,"
					+ "ACCESS_TOKEN "
					+ "from TBL_LOGIN tl "
					+ "left join TBL_TOKEN tt on tl.LOGIN_KEY = tt.LOGIN_KEY");
			
			while(rs.next()) {
				System.out.println(rs.getString(1));
				System.out.println(rs.getString(2));
				System.out.println(rs.getString(3));
			}
			
			
			/*rs = stmt.executeQuery("select token_type,access_token,refresh_token,expires_in,scope,user_seq_no from tbl_token tt left join tbl_login tl on tt.login_key=tl.login_key ;");
			
			TokenDTO tokenDTO = new TokenDTO();

			while(rs.next()) {
				tokenDTO.setTokenType(rs.getString("token_type"));
				tokenDTO.setAccessToken(rs.getString("access_token"));
				tokenDTO.setRefreshToken(rs.getString("refresh_token"));
				tokenDTO.setExpiresIn(rs.getString("expires_in"));
				tokenDTO.setScope(rs.getString("scope"));
				tokenDTO.setUserSeqNo(rs.getString("user_seq_no"));
			}
			
			System.out.println(tokenDTO.toString());*/
			
			rs.close();
			stmt.close();
			con.close();
			
			
		}catch(Exception e) {
			System.out.println(e);
		}
	}
	

}
