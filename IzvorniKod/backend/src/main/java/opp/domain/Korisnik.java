package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Korisnik {

    @Id
    @Column(unique = true)
    @NotNull
    private String email;

    @Size(min=8)
    @NotNull
    private String hashLozinke;
    @NotNull
    private String ime;
    @NotNull
    private String prezime;

    @ManyToOne
    private Konferencija konferencija;

    @Override
    public String toString() {
        return "Korisnik{" +
                "email='" + email + '\'' +
                ", hashLozinke='" + hashLozinke + '\'' +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                ", konferencija=" + konferencija +
                '}';
    }
}
