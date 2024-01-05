package opp.rest;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.domain.Mjesto;
import opp.domain.MjestoKonferencijaDTO;
import com.fasterxml.jackson.databind.JsonNode;
import opp.service.KorisnikService;
import opp.service.MjestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import opp.service.KonferencijaService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
@RestController
@CrossOrigin("*")
@RequestMapping("/konferencija")
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;

    @Autowired
    private MjestoService mjestoService;

    @Autowired
    private KorisnikService korisnikService;



    //@PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addKonfStari")
    public ResponseEntity<String> addKonfStari(@RequestBody Konferencija konf){
        konfService.addKonferencija(konf);
        return new ResponseEntity<>("Konferencija created successfully", HttpStatus.CREATED);
    }


    @PostMapping("/addKonf")
    public ResponseEntity<String> addKonf(@RequestBody MjestoKonferencijaDTO mjestodto) {

        Mjesto gradic = new Mjesto();
        gradic.setUlica(mjestodto.getUlica());
        gradic.setKucBroj(mjestodto.getKucBroj());
        gradic.setNazivMjesta(mjestodto.getNazivMjesta());
        gradic.setPbr(mjestodto.getPbr());

        Konferencija konferencija = new Konferencija();
        konferencija.setIme(mjestodto.getIme());
        konferencija.setPassword(mjestodto.getPassword());
        konferencija.setEndTime(mjestodto.getEndTime());
        konferencija.setStartTime(mjestodto.getStartTime());

        mjestoService.save(gradic);

        //korisnik
        Korisnik korisnik = korisnikService.findByEmail(mjestodto.getEmail());
        konferencija.setKorisnik(korisnik);
        konferencija.setMjesto(gradic);
        konfService.addKonferencija(konferencija);

        return ResponseEntity.ok("Konferencija i Mjesto uspješno dodani");
    }

    @PostMapping("/checkKonfCode")
    public ResponseEntity<Boolean> checkKonfCode(@RequestBody String code) {
        String pass = code.substring(0, code.length() - 1);
        Konferencija konf = konfService.findByPassword(pass);
        if (konf != null) {
            return ResponseEntity.ok(Boolean.FALSE);
        } else {
            return ResponseEntity.ok(Boolean.TRUE);
        }
    }

    @PostMapping("/loginKonf")
    public ResponseEntity<?> loginKonf(@RequestBody String pass) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(pass);
        String password = jsonNode.get("password").asText();
        Konferencija existingOne = konfService.findByPassword(password);
        System.out.println("front se izvodi u dretvi s ID-om: " + Thread.currentThread().getId());
        if (existingOne != null) {
            return new ResponseEntity<>(existingOne, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/getKonfId")
    public ResponseEntity<?> getKonfId(@RequestBody String pass) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(pass);
        String password = jsonNode.get("password").asText();
        Konferencija existingOne = konfService.findByPassword(password);
        if (existingOne != null) {
            return new ResponseEntity<>(existingOne.getKonfid(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getLocation/{id}")
    public ResponseEntity<?> getLocation(@PathVariable Long id){
        Konferencija konferencija = konfService.findByKonfid(id);
        if(konferencija != null){
            return new ResponseEntity<>(konferencija.getMjesto(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Invalid credentials", HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/getAllKonf")
    public ResponseEntity<List<Konferencija>> getAllKonf(){
        System.out.println(konfService.listAll());
        return ResponseEntity.ok(konfService.listAll());
    }

    @PostMapping("/getKorisnikKonf")
    public ResponseEntity<?> getAllKorisnikKonf(@RequestBody Map<String, String> requestBody){
        String email = requestBody.get("email");
        Korisnik korisnik = korisnikService.findByEmail(email);
        if(korisnik == null){
            return new ResponseEntity<>("Korisnik ne postoji", HttpStatus.NOT_FOUND);
        }
        List<Konferencija> konferencijaList = konfService.listAll();
       konferencijaList =  konferencijaList.stream()
                .filter(konferencija -> konferencija.getKorisnik().getEmail().equals(email))
                .collect(Collectors.toList());

       return new ResponseEntity<>(konferencijaList, HttpStatus.OK);
    }
}
