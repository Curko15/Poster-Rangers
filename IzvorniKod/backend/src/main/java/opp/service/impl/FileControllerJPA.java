package opp.service.impl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;

@Service
public class FileControllerJPA {
    public byte[] uploadanje(MultipartFile datoteka, Long ID) throws IOException, SQLException {

        //Ne zaboravi da je promjenjeno šta funkcija vraća

        Path trenutniDirektorij = Paths.get(System.getProperty("user.dir"));
        Path relativnaPutanja = trenutniDirektorij.resolve("IzvorniKod/backend/src/main/resources/static");


        StringBuilder builder = new StringBuilder();
        builder.append(ID + "_");
        builder.append(datoteka.getOriginalFilename());


        Path uploadPath = Paths.get(relativnaPutanja.toString(), builder.toString());

        //Files.copy(datoteka.getInputStream(), uploadPath);

        byte[] bytes = datoteka.getBytes();
        Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);


        return bytes;
        //return builder.toString();
    }

}
