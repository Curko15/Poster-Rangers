package opp.rest;

import opp.domain.Konferencija;
import opp.domain.Mjesto;
import opp.service.MjestoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/mjesto")
public class MjestoController {

    private MjestoService mjestoService;

    public MjestoController(MjestoService mjestoService) {
        this.mjestoService = mjestoService;
    }



    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addMjesto")
    public ResponseEntity<String> addKonf(@RequestBody Mjesto mjesto){
        mjestoService.addKonferencija(mjesto);
        return new ResponseEntity<>("Mjesto created successfully", HttpStatus.CREATED);
    }
}
