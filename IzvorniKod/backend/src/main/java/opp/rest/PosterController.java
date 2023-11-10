package opp.rest;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.domain.Poster;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/poster")
@NoArgsConstructor
@AllArgsConstructor
public class PosterController {
    @Autowired
    PosterService posterService;
    @Autowired
    KonferencijaService konferencijaService;

    @PostMapping("/{id}")
    public ResponseEntity<String> addPoster(@RequestBody Poster poster, @PathVariable Long id){
        // Fetch the Konferencija based on id
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }

        // Associate the Poster with the Konferencija
        poster.setKonferencija(konferencija);

        // Save the Poster
        // Assuming you have a service class to handle business logic, you can use it here
        posterService.save(poster); // You need to implement this method

        return ResponseEntity.ok("Poster added successfully");
    }

    @GetMapping("getAll/{id}")
    public ResponseEntity<List<Poster>> getAllPosters(@PathVariable Long id){
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<Poster> posteri = konferencija.getPosteri();
        System.out.println(posteri);
        return ResponseEntity.ok(posteri);
    }

}
