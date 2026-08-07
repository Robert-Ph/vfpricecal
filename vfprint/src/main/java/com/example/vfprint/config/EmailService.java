package com.example.vfprint.config;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import com.example.vfprint.service.system.SystemconfigService;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    
    
    private final MailSenderFactory mailSenderFactory;
    private final SystemconfigService systemconfigService;

    // 1. Gửi email dạng văn bản thường (Plain Text)
    public void sendSimpleEmail(String to, String subject, String body) {
         if (!systemconfigService.getBoolean("EMAIL_ENABLE")) {
            return;
        }

        JavaMailSender mailSender = mailSenderFactory.create();

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(systemconfigService.getValue("EMAIL_FROM_ADDRESS"));
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

    }

    // 2. Gửi email dạng HTML (có hỗ trợ đính kèm file)
    public void sendHtmlEmail(String to, String subject, String htmlBody) {
       if (!systemconfigService.getBoolean("EMAIL_ENABLE")) {
            return;
        }
        try {
            JavaMailSender mailSender = mailSenderFactory.create();

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(systemconfigService.getValue("EMAIL_FROM_ADDRESS"));
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

        mailSender.send(message);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        
    }

    @Async
public void sendNewPasswordEmail(String toEmail, String newPassword) {

    try {
        if (!systemconfigService.getBoolean("EMAIL_ENABLE")) {
            return;
        }

        JavaMailSender mailSender = mailSenderFactory.create();

        String fromEmail = systemconfigService.getValue("EMAIL_FROM_ADDRESS");
        String systemName = systemconfigService.getValue("EMAIL_FROM_NAME");

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

        helper.setFrom(new InternetAddress(fromEmail, systemName, "UTF-8"));
        helper.setTo(toEmail);
        helper.setSubject("[Account] Mật khẩu mới của bạn đã được cấp lại");

        String body = "Xin chào,\n\n"
                + "Hệ thống đã nhận được yêu cầu cấp lại mật khẩu của bạn.\n"
                + "Mật khẩu mới được cấp là: " + newPassword + "\n\n"
                + "Vui lòng đăng nhập lại bằng mật khẩu này và đổi ngay mật khẩu mới để đảm bảo an toàn.\n\n"
                + "Trân trọng,\n"
                + systemName;

        helper.setText(body, false);

        mailSender.send(message);

    } catch (Exception e) {
        e.printStackTrace();
    }
}

    @Async
    public void sendPasswordNewAccount(String toEmail, String newPassword){
        if (!systemconfigService.getBoolean("EMAIL_ENABLE")) {
            return;
        }
        try {
        JavaMailSender mailSender = mailSenderFactory.create();

        String fromEmail = systemconfigService.getValue("EMAIL_FROM_ADDRESS");
        String systemName = systemconfigService.getValue("EMAIL_FROM_NAME");

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

        helper.setFrom(new InternetAddress(fromEmail, systemName, "UTF-8"));
        helper.setTo(toEmail);
        helper.setSubject("[VFPrint] Tài khoản mới của bạn đã được tạo");

        String body = "Xin chào,\n\n"
                + "Hệ thống đã nhận được yêu cầu tạo tài khoản mới cho bạn.\n"
                + "Email đăng nhập của bạn là: " + toEmail + "\n"
                + "Mật khẩu mới được cấp là: " + newPassword + "\n\n"
                + "Vui lòng đăng nhập lại bằng mật khẩu này và đổi ngay mật khẩu mới để đảm bảo an toàn.\n\n"
                + "Trân trọng,\n"
                + systemName;

        helper.setText(body, false);

        mailSender.send(message);

    } catch (Exception e) {
        e.printStackTrace();
    }

        
    }

}
