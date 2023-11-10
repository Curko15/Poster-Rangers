package opp.rest;
import opp.domain.Konferencija;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {
    private static final String putanja = "OVO PROMJENI U PUTANJU";

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("datoteka") MultipartFile datoteka) throws IOException {



        Path uploadPath = Paths.get(putanja, datoteka.getOriginalFilename());

        Files.copy(datoteka.getInputStream(), uploadPath);

        return ResponseEntity.ok("Datoteka upload-ana: " + datoteka.getOriginalFilename());
    }

}
