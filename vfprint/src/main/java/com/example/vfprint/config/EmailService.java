package com.example.vfprint.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    // 1. Gửi email dạng văn bản thường (Plain Text)
    public void sendSimpleEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("vfpricecal.service@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

    }

    // 2. Gửi email dạng HTML (có hỗ trợ đính kèm file)
    public void sendHtmlEmail(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        
        // Truyền 'true' vào constructor nếu bạn muốn đính kèm file (Multipart)
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom("vfpricecal.service@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        
        // Truyền 'true' ở tham số thứ hai để hệ thống hiểu đây là định dạng HTML
        helper.setText(htmlBody, true); 

        // Tùy chọn: Nếu muốn đính kèm file, hãy bỏ comment dòng dưới đây
        // helper.addAttachment("tailieu.pdf", new ClassPathResource("tailieu.pdf"));

        mailSender.send(message);
    }

    public void sendNewPasswordEmail(String toEmail, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // Thiết lập người gửi (Tên hiển thị <email>)
        message.setFrom("vfpricecal.service@gmail.com");
        message.setTo(toEmail);
        message.setSubject("[ABC] Mật khẩu mới của bạn đã được cấp lại");
        
        // Nội dung thuần văn bản (Plain text)
        String body = "Xin chào,\n\n"
                    + "Hệ thống đã nhận được yêu cầu cấp lại mật khẩu của bạn.\n"
                    + "Mật khẩu mới được cấp là: " + newPassword + "\n\n"
                    + "Vui lòng đăng nhập lại bằng mật khẩu này và đổi ngay mật khẩu mới để đảm bảo an toàn.\n\n"
                    + "Trân trọng,\n"
                    + "vfpricecal.service@gmail.com";
                    
        message.setText(body);

        // Tiến hành gửi
        mailSender.send(message);
        
    }

    @Async
    public void sendPasswordNewAccount(String toEmail, String newPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        
        // Thiết lập người gửi (Tên hiển thị <email>)
        message.setFrom("vfpricecal.service@gmail.com");
        message.setTo(toEmail);
        message.setSubject(" [VFPrint]Tài khoản mới của bạn đã được tạo");
        
        // Nội dung thuần văn bản (Plain text)
        String body = "Xin chào,\n\n"
                    + "Hệ thống đã nhận được yêu cầu tạo tài khoản mới cho bạn.\n"
                    + "email đăng nhập của bạn là: " + toEmail + "\n"
                    + "Mật khẩu mới được cấp là: " + newPassword + "\n\n"
                    + "Vui lòng đăng nhập lại bằng mật khẩu này và đổi ngay mật khẩu mới để đảm bảo an toàn.\n\n"
                    + "Trân trọng,\n"
                    + "vfpricecal.service@gmail.com";
                    
        message.setText(body);

        // Tiến hành gửi
        mailSender.send(message);
        
    }

}
