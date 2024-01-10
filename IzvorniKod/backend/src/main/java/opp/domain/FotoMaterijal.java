package opp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "FotoMaterijal")
public class FotoMaterijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fotoID; //Jedinstveni identifikator fotografije

    private String nazivFoto; //Naziv fotografije

    private String fotoPath; //Putanja do izvora fotografije

    @JsonIgnore
    @ManyToOne
    private Konferencija konferencija;

    @Column(columnDefinition = "bytea")
    private byte[] fotobyte;

    private String fotoType;

}
