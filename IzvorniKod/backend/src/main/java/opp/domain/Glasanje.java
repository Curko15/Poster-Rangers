package opp.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.Data;

@Entity
@Data
public class Glasanje {

    @EmbeddedId
    private glasanjeId id = new glasanjeId();

    private Long posterId;

    @ManyToOne
    @MapsId("konfId")
    private Konferencija konferencija;

    @ManyToOne
    @MapsId("email")
    private Korisnik korisnik;


}
