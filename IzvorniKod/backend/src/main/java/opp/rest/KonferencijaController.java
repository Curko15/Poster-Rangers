package opp.rest;


import opp.domain.Konferencija;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import opp.service.KonferencijaService;
import java.util.List;


@RestController
@RequestMapping("/konferencija")
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;

    @PostMapping("/addKonf")
    public ResponseEntity<String> addKonf(@RequestBody Konferencija konf){
        konfService.addKonferencija(konf);
        return new ResponseEntity<>("Konferencija created successfully", HttpStatus.CREATED);
    }

    @GetMapping("")
    public List<Konferencija> listKonferencija() {
        return konfService.listAll();
    }


    @PostMapping("/loginKonf")
    public ResponseEntity<String> loginKonf(@RequestBody String userPassword){
            return null;
    }
}
