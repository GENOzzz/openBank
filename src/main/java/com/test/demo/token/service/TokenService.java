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
		int rs = 0;//??
				
		boolean result = false;
				
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("Token DB Connected Add");
			
			stmt = con.createStatement();
			
			String query=
					"BEGIN; "
					+ "insert into TBL_TOKEN ("
					+ "LOGIN_KEY, "
					+ "TOKEN_TYPE, "
					+ "ACCESS_TOKEN, "
					+ "REFRESH_TOKEN, "
					+ "EXPIRES_IN,"
					+ "SCOPE, "
					+ "USER_SEQ_NO, "
					+ "INPUT_KEY, "
					+ "INPUT_DATE, "
					+ "UPDATE_KEY,"
					+ "UPDATE_DATE )"
					+ "values("
					+ "'" + tokenDTO.getLoginKey()+"', "
					+ "'" + tokenDTO.getTokenType()+ "', "
					+ "'" + tokenDTO.getAccessToken()+"', "
					+ "'" + tokenDTO.getRefreshToken()+"', "
					+ "'" + tokenDTO.getExpiresIn()+"', "
					+ "'" + tokenDTO.getScope()+"', "
					+ "'" + tokenDTO.getUserSeqNo()+"', "
					+ "'" + tokenDTO.getInputKey() +"', "
					+ "datetime('now'), "
					+"'" + tokenDTO.getInputKey() + "', "
					+ "datetime('now'));";
			
			System.out.println(query);
			
			rs = stmt.executeUpdate(query);
			
			if(rs == 1) {
				stmt.execute("COMMIT;");
				result = true;
			}else {
				stmt.execute("ROLLBACK;");
			}
			
			stmt.close();
			con.close();
			
			
		}catch(Exception e) {
			System.out.println(e);
		}
		
		return result;
	}
	
	public boolean updateToken(TokenDTO tokenDTO) {
		Connection con = null;//connector
		Statement stmt = null;//??
		int rs = 0;//??
		
		boolean result = false;
		
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("Token DB Connected update!");
			
			stmt = con.createStatement();
			
			String query=
					"BEGIN;"
					+" UPDATE "
					+ "TBL_TOKEN"
					+ " SET "
					+ "TOKEN_TYPE = 'Baerer'"
					+ ", ACCESS_TOKEN = '" + tokenDTO.getAccessToken()+"'"
					+ ", REFRESH_TOKEN = '" + tokenDTO.getRefreshToken()+"'"
					+ ", EXPIRES_IN = '" + tokenDTO.getExpiresIn()+"'"
					+ ", SCOPE = '" + tokenDTO.getScope()+"'"
					+ ", USER_SEQ_NO = '" + tokenDTO.getUserSeqNo()+"'"
					+ ", UPDATE_KEY = '" + tokenDTO.getInputKey() +"'"
					+ ", UPDATE_DATE = datetime('now')"
					+ " WHERE "
					+ "LOGIN_KEY = '" + tokenDTO.getLoginKey() +"';";
			
			System.out.println(query);
			
			rs = stmt.executeUpdate(query);
						
			if(rs == 1) {
				stmt.execute("COMMIT;");
				result = true;
			}else {
				stmt.execute("ROLLBACK");
			}
			
			stmt.close();
			con.close();
			
		}catch(Exception e) {
			System.out.println(e);
		}
		
		return result;
		
	}

	public TokenDTO getToken(LoginDTO loginDTO) {
		Connection con = null;//connector
		Statement stmt = null;//??
		ResultSet rs = null;//??
		
		TokenDTO tokenDTO = new TokenDTO();
		
		try {
			Class.forName("org.sqlite.JDBC");
			con = DriverManager.getConnection(dbFileUrl);
			System.out.println("Token DB Connected Add");
			
			stmt = con.createStatement();
			
			String query=
					"SELECT "
					+ "access_token,	"
					+ "refresh_token, "
					+ "update_date "
					+ "FROM "
					+ "tbl_token	"
					+ "WHERE "
					+ "login_key = 2";
			
			System.out.println(query);
			
			rs = stmt.executeQuery(query);
						
			while(rs.next()) {
				tokenDTO.setAccessToken(rs.getString("access_token"));
				tokenDTO.setRefreshToken(rs.getString("refresh_token"));
				tokenDTO.setUpdateDate(rs.getString("update_date"));
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
