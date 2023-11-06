package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Korisnik {

    @Id
    @Column(unique = true)
    @NotNull
    private String email;

    @Size(min=8)
    private String hashLozinke;

    @ManyToOne
    private Konferencija konferencija;





    public String getEmail() {
        return email;
    }

    public String gethashLozinke() {
        return hashLozinke;
    }

    public Konferencija getKonferencija() {
        return konferencija;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setKonferencija(Konferencija konferencija) {
        this.konferencija = konferencija;
    }

    @Override
    public String toString() {
        return "Korisnik{" +
                "email='" + email + '\'' +
                ", konferencija=" + konferencija +
                '}';
    }
}
