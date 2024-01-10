package opp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PromoMaterijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promoId;

    private String nazivPromo;

    private String promoPath;

    private String url;

    @JsonIgnore
    @ManyToOne
    private Konferencija konferencija;

    @Column(columnDefinition = "bytea")
    private byte[] promobyte;

    private String promoType;

}
