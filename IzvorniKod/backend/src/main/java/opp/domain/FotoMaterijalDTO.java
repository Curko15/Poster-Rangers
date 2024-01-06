package opp.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class FotoMaterijalDTO {

    private String nazivFoto;

    private MultipartFile file;
}
