package opp.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PosterDTO {
    private String emailAutor;

    private String imeAutor;

    private String prezimeAutor;

    private String nazivPoster;

    private MultipartFile file;

}
