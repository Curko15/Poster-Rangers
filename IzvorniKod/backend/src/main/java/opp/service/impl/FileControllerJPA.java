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
    private static final String putanja = "C:\\Users\\lukal\\Documents\\FER\\3. Godina\\Programsko inzenjerstvo\\Moj Github\\Poster-Rangers\\IzvorniKod\\backend\\src\\main\\resources\\static";


    public String uploadanje(MultipartFile datoteka, Long ID) throws IOException {

        StringBuilder builder = new StringBuilder();
        builder.append(ID + "_");
        builder.append(datoteka.getOriginalFilename());


        Path uploadPath = Paths.get(putanja, builder.toString());

        Files.copy(datoteka.getInputStream(), uploadPath);

        return uploadPath.toString();
    }

}
