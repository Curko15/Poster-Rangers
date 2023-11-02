package hr.fer.progi.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class Korisnik {

    @Id
    private String email;

    @Size(min=8)
    private String lozinka;

    @ManyToOne
    private Konferencija konferencija;

}
