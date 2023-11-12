package opp.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "FotoMaterijal")
public class FotoMaterijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fotoID; //Jedinstveni identifikator fotografije

    private String nazivFoto; //Naziv fotografije

    private String fotoPath; //Putanja do izvora fotografije

    @ManyToOne
    private Konferencija konferencija;

}
