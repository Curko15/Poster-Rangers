package opp.rest;

import lombok.Data;
import opp.domain.*;
import opp.service.GlasanjeService;
import opp.service.KonferencijaService;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@Data
@CrossOrigin("*")
@RequestMapping("/glasanje")

public class GlasanjeController {

    @Autowired
    private GlasanjeService glasanjeService;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
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

        Map<Long, Integer> glasovi = glasanjeService.MapPoredak(glasDTO.getKonfId());
        System.out.println(glasovi);
        return new ResponseEntity<>("Glas dodan", HttpStatus.CREATED);

    }

    @DeleteMapping("/removeGlas")
    public void removeGlas(@RequestParam String email, @RequestParam Long konferencijaId){
        //Možda bi valjalo dodati neke if-eve ili try catch blokove za projveru jel našao Konferenciju i Korisnika
        Korisnik korisnik = korisnikService.findByEmail(email);
        Konferencija konferencija = konferencijaService.findByKonfid(konferencijaId);

        glasanjeService.deleteGlasanje(korisnik, konferencija);
    }
}
