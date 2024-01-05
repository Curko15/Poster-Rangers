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
        Path trenutniDirektorij = Paths.get(System.getProperty("user.dir"));
        Path relativnaPutanja = trenutniDirektorij.resolve("IzvorniKod/backend/src/main/resources/static/images");


        StringBuilder builder = new StringBuilder();
        builder.append(ID + "_");
        builder.append(datoteka.getOriginalFilename());


        Path uploadPath = Paths.get(relativnaPutanja.toString(), builder.toString());

        //Files.copy(datoteka.getInputStream(), uploadPath);

        byte[] bytes = datoteka.getBytes();
        Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);


        return bytes;
    }

    /*public String uploadanje(MultipartFile datoteka, Long ID) throws IOException {
        System.out.println("Usao sam");

        Path trenutniDirektorij = Paths.get(System.getProperty("user.dir"));
        System.out.println("trenutniDirektorij putanja: " + trenutniDirektorij);
        Path relativnaPutanja = trenutniDirektorij.resolve("IzvorniKod/backend/src/main/resources/static/images");
        String zaljepi = "/src/main/resources/static/images";

        System.out.println("relativnaPutanja: " + relativnaPutanja);

        String pravaPutanja = trenutniDirektorij.toString() + zaljepi;

        System.out.println("Prava putanja: " + pravaPutanja);
        StringBuilder builder = new StringBuilder();
        builder.append(ID).append("_").append(datoteka.getOriginalFilename());

        System.out.println("Builder: " + builder);

        Path uploadPath = Paths.get(pravaPutanja, builder.toString());

        System.out.println("Putanja za kopiranje: " + uploadPath);

        try {
            // Kreiraj File objekt iz Path
            File file = uploadPath.toFile();

            // Kopiraj sadržaj MultipartFile-a u File koristeći transferTo metodu
            datoteka.transferTo(file);

            System.out.println("Datoteka uspješno kopirana");
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Greška prilikom kopiranja datoteke");
        }
        return builder.toString();
    }*/
}