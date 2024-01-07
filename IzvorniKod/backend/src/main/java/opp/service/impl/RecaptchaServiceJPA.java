package opp.service.impl;

import opp.domain.RecaptchaResponse;
import opp.service.RecaptchaService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Service
public class RecaptchaServiceJPA implements RecaptchaService {
    @Value("${recaptcha.secret-key}")
    private String recaptchaSecretKey;

    @Override
    public boolean verifyRecaptcha(String recaptchaResponse) {
        final String url = "https://www.google.com/recaptcha/api/siteverify?secret="+ recaptchaSecretKey + "&response=" + recaptchaResponse;

        RestTemplate restTemplate = new RestTemplate();
        RecaptchaResponse recaptchaApiResponse = restTemplate.postForObject(url, null, RecaptchaResponse.class, recaptchaSecretKey, recaptchaResponse);

        return recaptchaApiResponse != null && recaptchaApiResponse.isSuccess();
    }
}