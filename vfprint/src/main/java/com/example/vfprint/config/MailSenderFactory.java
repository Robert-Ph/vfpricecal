package com.example.vfprint.config;

import java.util.Properties;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import com.example.vfprint.service.system.SystemconfigService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailSenderFactory {
    private final SystemconfigService configService;

    public JavaMailSender create() {

        JavaMailSenderImpl sender = new JavaMailSenderImpl();

        sender.setHost(configService.getValue("SMTP_HOST"));
        sender.setPort(configService.getInteger("SMTP_PORT"));
        sender.setUsername(configService.getValue("SMTP_USERNAME"));
        sender.setPassword(configService.getValue("SMTP_PASSWORD"));

        Properties props = sender.getJavaMailProperties();

        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");

        return sender;
    }
}
