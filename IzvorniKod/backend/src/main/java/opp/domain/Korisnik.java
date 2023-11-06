package opp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

@Entity
public class Korisnik {

    @Id
    private String email;

    @Size(min=8)
    private String lozinka;

    @ManyToOne
    private Konferencija konferencija;

}
