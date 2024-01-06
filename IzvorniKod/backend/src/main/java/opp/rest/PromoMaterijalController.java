package opp.rest;



import opp.domain.*;
import opp.service.FotoMaterijalService;
import opp.service.KonferencijaService;
import opp.service.PosterService;
import opp.service.PromoMaterijalService;
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
@RequestMapping("/promomaterijal")
public class PromoMaterijalController {

    @Autowired
    PromoMaterijalService promoMaterijalService;
    @Autowired
    KonferencijaService konferencijaService;
    @Autowired
    FileControllerJPA fileService;



    @PostMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<String> addPromo(@ModelAttribute PromoMaterijalDTO promoDTO, @PathVariable Long id) throws IOException, SQLException {
        System.out.println("Usao u kontroler Promo");

        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>("Konferencija nije pronađena", HttpStatus.BAD_REQUEST);
        }

        PromoMaterijal promoMaterijal = new PromoMaterijal();
        promoMaterijal.setNazivPromo(promoDTO.getNazivPromo());
        promoMaterijal.setUrl(promoDTO.getUrl());
        promoMaterijal.setKonferencija(konferencija);



        byte[] bl = fileService.uploadanje(promoDTO.getFile(), id);

        MediaType mediaType = MediaType.parseMediaType(promoDTO.getFile().getContentType());
        String fileType = mediaType.getSubtype();
        promoMaterijal.setPromoType(fileType);

        promoMaterijal.setPromobyte(bl);

        //Stock:
        /*
        String path = fileService.uploadanje(poster.getFile(), id);
        System.out.println("Konferencija: " + path);
        posteric.setPosterPath(path);
        */


        promoMaterijalService.save(promoMaterijal);

        return ResponseEntity.ok("Promo Materijal uspješno dodan");
    }



    @GetMapping("getAll/{id}")
    public ResponseEntity<List<PromoMaterijal>> getAllPromos(@PathVariable Long id){
        Konferencija konferencija = konferencijaService.findByKonfid(id);

        if (konferencija == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<PromoMaterijal> promomaterijali = konferencija.getPromo();
        System.out.println(promomaterijali);
        return ResponseEntity.ok(promomaterijali);
    }

}
