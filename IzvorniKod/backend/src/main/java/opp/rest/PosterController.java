package opp.rest;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import opp.domain.*;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import opp.domain.Konferencija;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import opp.service.impl.FileControllerJPA;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/poster")
@NoArgsConstructor
@AllArgsConstructor
@CrossOrigin("*")
public class PosterController {
    @Autowired
    PosterService posterService;
    @Autowired
    KonferencijaService konferencijaService;

    @Autowired
    FileControllerJPA fileService;

    @PostMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<String> addPoster(@ModelAttribute PosterDTO poster, @PathVariable Long id) throws IOException {
        // Fetch the Konferencija based on id
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }

        Poster posteric = new Poster();
        posteric.setNazivPoster(poster.getNazivPoster());
        posteric.setImeAutor(poster.getImeAutor());
        posteric.setPrezimeAutor(poster.getPrezimeAutor());
        posteric.setEmailAutor(poster.getEmailAutor());
        // Associate the Poster with the Konferencija
        posteric.setKonferencija(konferencija);

        String path = fileService.uploadanje(poster.getFile(), id);

        posteric.setPosterPath(path);

        // Save the Poster
        // Assuming you have a service class to handle business logic, you can use it here
        posterService.save(posteric); // You need to implement this method

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
