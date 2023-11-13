package opp.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import opp.domain.Korisnik;
import opp.domain.LoginDto;
import opp.domain.User;
import opp.service.KorisnikService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/korisnici")
public class KorisnikController {

    private KorisnikService korisnikService;

    public KorisnikController(KorisnikService korisnikService) {
        this.korisnikService = korisnikService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Korisnik korisnik) {
        //System.out.println(user);
        System.out.println(korisnik);
        korisnikService.save(korisnik);
        return new ResponseEntity<>("Korisnik registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Korisnik korisnik) throws JsonProcessingException {


        Korisnik postojeciKorisnik = korisnikService.findByEmail(korisnik.getEmail());
        boolean match = korisnikService.checkLozinka(korisnik.getHashLozinke(), postojeciKorisnik);

        if (postojeciKorisnik != null && match) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
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
