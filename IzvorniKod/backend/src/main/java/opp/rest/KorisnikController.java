package opp.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import opp.domain.*;
import opp.service.KorisnikService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "https://poster-rangers-fe.onrender.com")
@RequestMapping("/korisnici")
public class KorisnikController {

    private KorisnikService korisnikService;
    private PasswordEncoder passwordEncoder;

    public KorisnikController(KorisnikService korisnikService, PasswordEncoder passwordEncoder) {
        this.korisnikService = korisnikService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        korisnikService.save(korisnik);
        return new ResponseEntity<>("Korisnik registered successfully", HttpStatus.CREATED);
    }

    //TEST

    @PostMapping("/registerPP")
    public ResponseEntity<AuthenticationResponse> registerPP(@RequestBody Korisnik korisnik){
           return ResponseEntity.ok(korisnikService.register(korisnik));
    }


    @PostMapping("/authenticatePP")
    public ResponseEntity<AuthenticationResponse> registerPP(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(korisnikService.authenticate(loginDto));
    }

    @PostMapping("/registerAdmin")
    public  ResponseEntity<?> registerAdmin(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        return ResponseEntity.ok(korisnikService.saveAdmin(korisnik));
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
       // return new ResponseEntity<>(response,HttpStatus.OK);
        return null;
    }

    @PreAuthorize("hasRole('KORISNIK')")
    @GetMapping("/listAll")
    public ResponseEntity<List<Korisnik>> listAllUsers(){
        List<Korisnik> lista = korisnikService.listAll();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }

    @PostMapping("/forgotPassword")
    public String processForgotPassword(@RequestBody String email){
        String token = generateRandomString(45);

        try {
            korisnikService.updateResetPasswordToken(token, email);
            //generate password link
            //send mail
            String resetPasswordLink = "";


        }catch (Exception e) {
            throw new UsernameNotFoundException("Korisnik s emailom: " + email + " ne postoji");
        }
        System.out.println("Email: " + email);
        System.out.println("Token: " + token);
        return null;
    }


    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }

        return sb.toString();
    }

}
