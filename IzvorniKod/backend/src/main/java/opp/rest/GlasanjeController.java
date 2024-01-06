package opp.rest;

import lombok.Data;
import opp.domain.*;
import opp.service.GlasanjeService;
import opp.service.KonferencijaService;
import opp.service.KorisnikService;
import opp.service.PosterService;
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

    @Autowired
    private PosterService posterService;

    public GlasanjeController(GlasanjeService glasanjeService) {
        this.glasanjeService = glasanjeService;
    }

    @GetMapping("/poredak")
    public Map<Long, Integer> poredak(@RequestParam Long konferencijaId){
        return glasanjeService.MapPoredak(konferencijaId);
    }

    @PostMapping("/addGlas")
    public ResponseEntity<String> addGlas(@RequestBody GlasanjeDTO glasDTO){
        System.out.println(glasDTO);

        glasanjeId glasid = new glasanjeId(glasDTO.getKonfId(), glasDTO.getEmail());

        //Glasanje glasanje2 = glasanjeService.findByEmail(glasDTO.getEmail());

        Glasanje glas = new Glasanje();
        glas.setId(glasid);


        Poster poster = posterService.findByPosterId(glasDTO.getPosterId());
        if(poster == null){
            return new ResponseEntity<>("Poster nije pronađen", HttpStatus.BAD_REQUEST);
        }
        glas.setPosterId(glasDTO.getPosterId());


        try {
            Korisnik korisnik = korisnikService.findByEmail(glasDTO.getEmail());
            if (korisnik == null) {
                return new ResponseEntity<>("Korisnik nije pronađen", HttpStatus.BAD_REQUEST);
            }
            glas.setKorisnik(korisnik);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Došlo je do greške prilikom pretrage korisnika. Vjerojatno korisnik ne postoji.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Konferencija konferencija = konferencijaService.findByKonfid(glasDTO.getKonfId());
        if(konferencija == null){
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }
        glas.setKonferencija(konferencija);


        glasanjeService.save(glas);

        Map<Long, Integer> glasovi = glasanjeService.MapPoredak(glasDTO.getKonfId());
        System.out.println(glasovi);
        return new ResponseEntity<>("Glas dodan", HttpStatus.CREATED);

    }

    @DeleteMapping("/removeGlas")
    public ResponseEntity<String> removeGlas(@RequestParam String email, @RequestParam Long konferencijaId){




        try {
            Korisnik korisnik = korisnikService.findByEmail(email);
            if (korisnik == null) {
                return new ResponseEntity<>("Korisnik nije pronađen", HttpStatus.BAD_REQUEST);
            }

            Konferencija konferencija = konferencijaService.findByKonfid(konferencijaId);
            if(konferencija == null){
                return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
            }

            glasanjeService.deleteGlasanje(korisnik, konferencija);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Došlo je do greške prilikom pretrage korisnika. Vjerojatno korisnik ne postoji.", HttpStatus.INTERNAL_SERVER_ERROR);
        }



        return new ResponseEntity<>("Glas obrisan", HttpStatus.OK);

    }
}
