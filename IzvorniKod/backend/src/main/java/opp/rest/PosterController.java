package opp.rest;

import lombok.Data;
import opp.domain.*;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import opp.domain.Konferencija;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import opp.service.impl.FileControllerJPA;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/poster")
@CrossOrigin(origins = "https://poster-rangers-fe.onrender.com")
@Data
public class PosterController {
    @Autowired
    PosterService posterService;
    @Autowired
    KonferencijaService konferencijaService;
    @Autowired
    FileControllerJPA fileService;

    @PostMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<String> addPoster(@ModelAttribute PosterDTO poster, @PathVariable Long id) throws IOException, SQLException {
        System.out.println("Usao u kontroler poster");

        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }

        Poster posteric = new Poster();
        posteric.setNazivPoster(poster.getNazivPoster());
        posteric.setImeAutor(poster.getImeAutor());
        posteric.setPrezimeAutor(poster.getPrezimeAutor());
        posteric.setEmailAutor(poster.getEmailAutor());
        posteric.setKonferencija(konferencija);


        byte[] bl = fileService.uploadanje(poster.getFile(), id);

        MediaType mediaType = MediaType.parseMediaType(poster.getFile().getContentType());
        String fileType = mediaType.getSubtype();
        posteric.setImageType(fileType);

        posteric.setImagebyte(bl);

        //Stock:
        /*
        String path = fileService.uploadanje(poster.getFile(), id);
        System.out.println("Konferencija: " + path);
        posteric.setPosterPath(path);
        */

        posterService.save(posteric);

        return ResponseEntity.ok("Poster uspješno dodan");
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
