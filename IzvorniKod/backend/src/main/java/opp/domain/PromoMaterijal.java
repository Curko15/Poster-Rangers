package opp.domain;

import jakarta.persistence.*;

@Entity
public class PromoMaterijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long promoId;

    private String nazivPromo;

    private String promoPath;

    private String url;

    @ManyToOne
    private Konferencija konferencija;

}
