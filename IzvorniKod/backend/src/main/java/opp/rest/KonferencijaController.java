package opp.rest;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import opp.domain.Konferencija;
import opp.domain.Mjesto;
import opp.domain.MjestoKonferencijaDTO;
import com.fasterxml.jackson.databind.JsonNode;
import opp.service.MjestoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import opp.service.KonferencijaService;
import java.util.List;

@Data
@RestController
@CrossOrigin("*")
@RequestMapping("/konferencija")
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;

    @Autowired
    private MjestoService mjestoService;



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

        konferencija.setMjesto(gradic);

        konfService.addKonferencija(konferencija);


        return ResponseEntity.ok("Konferencija i Mjesto uspješno dodani");

    }



    @PostMapping("/loginKonf")
    public ResponseEntity<?> loginKonf(@RequestBody String pass) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(pass);
        String password = jsonNode.get("password").asText();
        Konferencija existingOne = konfService.findByPassword(password);
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
}
