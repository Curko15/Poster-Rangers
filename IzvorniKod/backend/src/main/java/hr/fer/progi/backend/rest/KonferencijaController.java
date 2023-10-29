package hr.fer.progi.backend.rest;

import hr.fer.progi.backend.domain.Konferencija;
import hr.fer.progi.backend.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;

    @PostMapping("/addKonf")
    public void addKonf(@RequestBody Konferencija konf){
        konfService.addKonferencija(konf);
    }

    @GetMapping("")
    public String marko(){
        return "jel radi";
    }
}
