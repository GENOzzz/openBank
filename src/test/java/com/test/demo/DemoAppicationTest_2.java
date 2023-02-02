package com.test.demo;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.test.demo.API.ClientDTO;

@SpringBootTest
public class DemoAppicationTest_2 {
	
	ClientDTO clientDTO = new ClientDTO();
	
	@Test
	void testTime() {
		System.out.println(clientDTO);
	}
}
