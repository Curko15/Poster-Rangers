package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

@Entity
@Data
public class Korisnik {

    @Id
    @Column(unique = true)
    @NotNull
    private String email;

    @Size(min=8)
    private String hashLozinke;

    @ManyToOne
    private Konferencija konferencija;






    @Override
    public String toString() {
        return "Korisnik{" +
                "email='" + email + '\'' +
                ", konferencija=" + konferencija +
                '}';
    }
}
