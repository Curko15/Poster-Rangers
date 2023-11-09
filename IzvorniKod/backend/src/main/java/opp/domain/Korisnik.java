package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

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



    @Override
    public String toString() {
        return "Korisnik{" +
                "email='" + email + '\'' +
                ", hashLozinke='" + hashLozinke + '\'' +
                ", ime='" + ime + '\'' +
                ", prezime='" + prezime + '\'' +
                '}';
    }
}
