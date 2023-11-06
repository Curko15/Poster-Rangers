package opp.rest;


import opp.domain.Konferencija;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import opp.service.KonferencijaService;
import java.util.List;


@RestController
@RequestMapping("/konferencija")
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;

    @PostMapping("/addKonf")
    public void addKonf(@RequestBody Konferencija konf){
        konfService.addKonferencija(konf);
    }

    @GetMapping("")
    public List<Konferencija> listKonferencija() {
        return konfService.listAll();
    }
}
