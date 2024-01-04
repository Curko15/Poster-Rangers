package opp.rest;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import opp.domain.*;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import opp.domain.Konferencija;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
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

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/poster")
@CrossOrigin(origins = "https://poster-rangers-fe.onrender.com")
@Data
public class PosterController {
    @Autowired
    PosterService posterService;
    @Autowired
    KonferencijaService konferencijaService;

    private final ResourceLoader resourceLoader;


    @Autowired
    FileControllerJPA fileService;

    public PosterController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @PostMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<String> addPoster(@ModelAttribute PosterDTO poster, @PathVariable Long id) throws IOException, SQLException {
        // Fetch the Konferencija based on id
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
        // Associate the Poster with the Konferencija
        posteric.setKonferencija(konferencija);


        //Blob:
        byte[] bl = fileService.uploadanje(poster.getFile(), id);

        MediaType mediaType = MediaType.parseMediaType(poster.getFile().getContentType());
        String fileType = mediaType.getSubtype(); // This gives you the file extension
        posteric.setImageType(fileType);

        posteric.setImagebyte(bl);

        //Stock:////////////////////////////////////////////
        //String path = fileService.uploadanje(poster.getFile(), id);
        //System.out.println("Konferencija: " + path);
        //posteric.setPosterPath(path);
        //////////////////////////////////////////////////////////////////

        // Save the Poster
        // Assuming you have a service class to handle business logic, you can use it here
        posterService.save(posteric); // You need to implement this method

        Resource staticFolder = resourceLoader.getResource("classpath:static/");

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
