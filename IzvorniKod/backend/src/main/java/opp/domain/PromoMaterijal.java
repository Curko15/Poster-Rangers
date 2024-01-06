package opp.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PromoMaterijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promoId;

    private String nazivPromo;

    private String promoPath;

    private String url;

    @ManyToOne
    private Konferencija konferencija;

    @Column(columnDefinition = "bytea")
    private byte[] promobyte;

    private String promoType;

}
