package com.example.vfprint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class VfprintApplication {

	public static void main(String[] args) {
		SpringApplication.run(VfprintApplication.class, args);
	}

}
