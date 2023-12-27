package opp.rest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;
import opp.domain.*;
import opp.service.GlasanjeService;
import opp.service.KonferencijaService;
import opp.service.KorisnikService;
import opp.service.impl.UserServiceJPA;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.util.List;

@RestController
@Data
@CrossOrigin("*")
@RequestMapping("/glasanje")

public class GlasanjeController {

    private GlasanjeService glasanjeService;

    private KorisnikService korisnikService;

    private KonferencijaService konferencijaService;

    public GlasanjeController(GlasanjeService glasanjeService) {
        this.glasanjeService = glasanjeService;
    }

    @PostMapping("/addGlas")
    public ResponseEntity<String> addGlas(@RequestBody GlasanjeDTO glasDTO){
        System.out.println(glasDTO);

        glasanjeId glasid = new glasanjeId(glasDTO.getKonfId(), glasDTO.getEmail());

        //Glasanje glasanje2 = glasanjeService.findByEmail(glasDTO.getEmail());

        Glasanje glas = new Glasanje();
        glas.setId(glasid);
        glas.setPosterId(glasDTO.getPosterId());


        Korisnik korisnik = korisnikService.findByEmail(glas.getId().getEmail());
        glas.setKorisnik(korisnik);

        Konferencija konferencija = konferencijaService.findByKonfid(glas.getId().getKonfId());
        glas.setKonferencija(konferencija);


        glasanjeService.save(glas);
        return new ResponseEntity<>("Glas dodan", HttpStatus.CREATED);

    }
}
