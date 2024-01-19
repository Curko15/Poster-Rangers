package opp.domain;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PromoMaterijalDTO {

    private String nazivPromo;

    private String url;

    private MultipartFile file;
}
