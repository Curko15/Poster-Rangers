package opp.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import opp.domain.*;
import opp.service.EmailSenderService;
import opp.service.KorisnikService;
import opp.service.RecaptchaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.security.SecureRandom;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://poster-rangers-fe.onrender.com")
@RequestMapping("/korisnici")
public class KorisnikController {

    private KorisnikService korisnikService;
    private PasswordEncoder passwordEncoder;

    private EmailSenderService emailSenderService;

    private RecaptchaService recaptchaService;

    public KorisnikController(KorisnikService korisnikService, PasswordEncoder passwordEncoder, EmailSenderService emailSenderService, RecaptchaService recaptchaService) {
        this.korisnikService = korisnikService;
        this.passwordEncoder = passwordEncoder;
        this.emailSenderService = emailSenderService;
        this.recaptchaService = recaptchaService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        Korisnik stari = korisnikService.findByEmail(korisnik.getEmail());
        if(stari != null){
            return new ResponseEntity<>("Korisnik već postoji", HttpStatus.BAD_REQUEST);
        }
        korisnikService.save(korisnik);
        return new ResponseEntity<>("Korisnik registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/verifyRecaptcha")
    public ResponseEntity<String> verifyRecaptcha(@RequestBody Map<String, String> requestBody) {
        String recaptchaResponse = requestBody.get("recaptchaToken");
        System.out.println(recaptchaResponse);
        if( recaptchaService.verifyRecaptcha(recaptchaResponse)){
            return ResponseEntity.ok("OK");
        }else{
            return ResponseEntity.status(400).body("CAPTCHA verification failed");
        }
    }

    @PostMapping("/registerPP")
    public ResponseEntity<AuthenticationResponse> registerPP(@RequestBody Korisnik korisnik){
        try {
            Korisnik stari = korisnikService.findByEmail(korisnik.getEmail());
        }catch(Exception e) {
            return ResponseEntity.ok(korisnikService.register(korisnik));
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/authenticatePP")
    public ResponseEntity<AuthenticationResponse> registerPP(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(korisnikService.authenticate(loginDto));
    }

    @PostMapping("/registerAdmin")
    public  ResponseEntity<?> registerAdmin(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        try {
            Korisnik stari = korisnikService.findByEmail(korisnik.getEmail());
        }catch(Exception e) {
            return ResponseEntity.ok(korisnikService.saveAdmin(korisnik));
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Korisnik korisnik) throws JsonProcessingException {
        System.out.println("Pokusaj login-a " + korisnik.getEmail());

        Korisnik postojeciKorisnik = korisnikService.findByEmail(korisnik.getEmail());
        if (postojeciKorisnik != null) {
            if(korisnikService.checkLozinka(korisnik.getPassword(), postojeciKorisnik)){
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }


    @PostMapping("/getRole")
    public ResponseEntity<?> getRole(@RequestBody LoginDto korisnik) throws JsonProcessingException {
        Korisnik postojeciKorisnik = korisnikService.findByEmail(korisnik.getEmail());
        System.out.println("Pokusaj login-a " + korisnik.getEmail());
        if (postojeciKorisnik != null) {
            if(korisnikService.checkLozinka(korisnik.getPassword(), postojeciKorisnik)){
                return new ResponseEntity<>(postojeciKorisnik.getRoles(), HttpStatus.OK);
            }
        }
       return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/login2")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
        //String response = korisnikService.login(loginDto);
        //return new ResponseEntity<>(response,HttpStatus.OK);
        return null;
    }

    @PreAuthorize("hasRole('KORISNIK')")
    @GetMapping("/listAll")
    public ResponseEntity<List<Korisnik>> listAllUsers(){
        List<Korisnik> lista = korisnikService.listAll();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping("/password-reset-request")
    public String processForgotPassword(@RequestBody Map<String, String> requestBody, final HttpServletRequest request){
        String token = generateRandomString(45);
        String email = requestBody.get("email");
        String passwordResetUrl = "";
        try {
            korisnikService.updateResetPasswordToken(token, email);
            String s =  getFrontendOrigin(request);
            passwordResetUrl =  passwordResetEmailLink(email, applicationUrl(request), token);

        }catch (Exception e) {
            throw new UsernameNotFoundException("Korisnik s emailom: " + email + " ne postoji");
        }
        return passwordResetUrl;
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestBody){
        String oldPassword = requestBody.get("oldPassword");
        String newPassword = requestBody.get("newPassword");
        String email = requestBody.get("email");
        Korisnik korisnik = korisnikService.findByEmail(email);
        if(korisnik != null){
            if(passwordEncoder.matches(oldPassword, korisnik.getPassword())){
                korisnik.setPassword(passwordEncoder.encode(newPassword));
                korisnikService.justSave(korisnik);
                return new ResponseEntity<>("Lozinka je promijenjena", HttpStatus.OK);
            }
            return new ResponseEntity<>("Lozinka je nije promijenjena", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Korisnik ne postoji", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> requestBody, @RequestParam("token") String token) throws Exception {
        Korisnik korisnik = korisnikService.findByResetPasswordToken(token);
        String newPassword = requestBody.get("newPassword");
        if(korisnik == null) throw new Exception("Token nije valjan");
        korisnikService.updatePassword(korisnik, newPassword);
        return "Lozinka je uspješno promijenjena";
    }

    private String passwordResetEmailLink(String email, String applicationUrl, String token) {
        String url = applicationUrl + "/resetirajLozinku?token=" + token;
        Korisnik korisnik = korisnikService.findByEmail(email);
        String mailContent ="<p> Hi, "+ korisnik.getIme() + ", </p>" +
                "<p><b>You recently requested to reset your password.<br></b>" +
                "Please, follow the link below to complete the action.</p>" +
                "<a href=\"" + url + "\">Reset password</a>" +
                "<p> Regards,<br>Users Registration Portal Service";

        String subject = "Password Reset Request Verification";
        emailSenderService.sendEmail(email, subject, mailContent);
        return url;
    }

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }

    private String applicationUrl(HttpServletRequest request){
        //return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
        String originHeader = request.getHeader("Origin");
        return originHeader;
    }

    private String getFrontendOrigin(HttpServletRequest request) {
        String originHeader = request.getHeader("Origin");

        // If the Origin header is present, return it; otherwise, return a default value
        return originHeader != null ? originHeader : "http://localhost:";
    }
}