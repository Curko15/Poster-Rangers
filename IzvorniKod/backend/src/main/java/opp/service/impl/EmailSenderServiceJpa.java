package opp.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import opp.service.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderServiceJpa implements EmailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String content) {
        // Create a MimeMessage
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            // Create a MimeMessageHelper with HTML content type
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // Set the second parameter to true to indicate HTML content
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Handle exception
        }
    }
}