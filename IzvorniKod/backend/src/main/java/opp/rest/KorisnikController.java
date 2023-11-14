package opp.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import opp.domain.Korisnik;
import opp.domain.LoginDto;
import opp.domain.Role;
import opp.domain.User;
import opp.service.KorisnikService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/korisnici")
public class KorisnikController {

    private KorisnikService korisnikService;
    private PasswordEncoder passwordEncoder;

    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        if (korisnikService.findByEmail(korisnik.getEmail()) != null) {
            return new ResponseEntity<>("Korisnik je već registriran", HttpStatus.CONFLICT);
        }
        korisnikService.save(korisnik);
        return new ResponseEntity<>("Korisnik registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/registerAdmin")
    public ResponseEntity<String> registerAdmin(@RequestBody Korisnik korisnik) {
        System.out.println(korisnik);
        if (korisnikService.findByEmail(korisnik.getEmail()) != null) {
            return new ResponseEntity<>("Admin već registriran", HttpStatus.CONFLICT);
        }
        korisnikService.saveAdmin(korisnik);
        return new ResponseEntity<>("Admin registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Korisnik korisnik) throws JsonProcessingException {
        System.out.println("Pokusaj login-a " + korisnik.getEmail());

        Korisnik postojeciKorisnik = korisnikService.findByEmail(korisnik.getEmail());
        if (postojeciKorisnik != null) {
            if(korisnikService.checkLozinka(korisnik.getHashLozinke(), postojeciKorisnik)){
                return new ResponseEntity<>("Login successful", HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/getRole")
    public ResponseEntity<?> getRole(@RequestBody LoginDto korisnik) throws JsonProcessingException {
        Korisnik postojeciKorisnik = korisnikService.findByEmail(korisnik.getEmail());
        if (postojeciKorisnik != null) {
            if(korisnikService.checkLozinka(korisnik.getPassword(), postojeciKorisnik)){
                return new ResponseEntity<>(postojeciKorisnik.getRoles(), HttpStatus.OK);
            }
        }
       return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/login2")
    public ResponseEntity<String> login(@RequestBody LoginDto loginDto){
       String response = korisnikService.login(loginDto);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('KORISNIK')")
    @GetMapping("/listAll")
    public ResponseEntity<List<Korisnik>> listAllUsers(){
        List<Korisnik> lista = korisnikService.listAll();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }
}
