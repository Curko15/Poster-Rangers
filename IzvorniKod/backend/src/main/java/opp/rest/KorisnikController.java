package opp.rest;


import com.fasterxml.jackson.core.JsonProcessingException;
import opp.domain.Korisnik;
import opp.domain.User;
import opp.service.KorisnikService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
}
