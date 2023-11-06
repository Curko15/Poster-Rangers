package opp.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "FotoMaterijal")
public class FotoMaterijal {

    @Id
    @GeneratedValue
    private int fotoID; //Jedinstveni identifikator fotografije


    private String nazivFoto; //Naziv fotografije

    private String fotoPath; //Putanja do izvora fotografije

    private int konfID; //Jedinstveni identifikator konferencij

    @ManyToOne
    private Konferencija konferencija;

}
