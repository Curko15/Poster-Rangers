package opp.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class Glasanje {

    @EmbeddedId
    private glasanjeId id = new glasanjeId();

    @ManyToOne
    @MapsId("konfId")
    private Konferencija konferencija;

    @ManyToOne
    @MapsId("email")
    private Korisnik korisnik;

    private Long posterId;
}
