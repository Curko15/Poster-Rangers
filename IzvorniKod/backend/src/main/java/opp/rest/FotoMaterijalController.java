package opp.rest;


import opp.domain.*;
import opp.service.FotoMaterijalService;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import opp.service.impl.FileControllerJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/fotomaterijal")
public class FotoMaterijalController {

    @Autowired
    FotoMaterijalService fotoMaterijalService;
    @Autowired
    KonferencijaService konferencijaService;
    @Autowired
    FileControllerJPA fileService;


    @PostMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<String> addFoto(@ModelAttribute FotoMaterijalDTO fotoDTO, @PathVariable Long id) throws IOException, SQLException {
        // Fetch the Konferencija based on id
        System.out.println("Usao u kontroler foto");
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }

        FotoMaterijal fotka = new FotoMaterijal();
        fotka.setNazivFoto(fotoDTO.getNazivFoto());
        fotka.setKonferencija(konferencija);


        //Blob:
        byte[] bl = fileService.uploadanje(fotoDTO.getFile(), id);

        MediaType mediaType = MediaType.parseMediaType(fotoDTO.getFile().getContentType());
        String fileType = mediaType.getSubtype(); // This gives you the file extension
        fotka.setFotoType(fileType);

        fotka.setFotobyte(bl);

        //Stock:////////////////////////////////////////////
        //String path = fileService.uploadanje(poster.getFile(), id);
        //System.out.println("Konferencija: " + path);
        //posteric.setPosterPath(path);
        //////////////////////////////////////////////////////////////////

        // Save the Poster
        // Assuming you have a service class to handle business logic, you can use it here
        fotoMaterijalService.save(fotka); // You need to implement this method


        return ResponseEntity.ok("Poster added successfully");
    }






    @GetMapping("getAll/{id}")
    public ResponseEntity<List<FotoMaterijal>> getAllFotos(@PathVariable Long id){
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<FotoMaterijal> fotografije = konferencija.getFotke();
        System.out.println(fotografije);
        return ResponseEntity.ok(fotografije);
    }

}
