package opp.service.impl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileControllerJPA {


    public String uploadanje(MultipartFile datoteka, Long ID) throws IOException {

        Path trenutniDirektorij = Paths.get(System.getProperty("user.dir"));
        Path relativnaPutanja = trenutniDirektorij.resolve("IzvorniKod/backend/src/main/resources/static");


        StringBuilder builder = new StringBuilder();
        builder.append(ID + "_");
        builder.append(datoteka.getOriginalFilename());


        Path uploadPath = Paths.get(relativnaPutanja.toString(), builder.toString());

        Files.copy(datoteka.getInputStream(), uploadPath);

        return builder.toString();
    }

}
