package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Korisnik {

    @Id
    @Column(unique = true)
    @NotNull
    @Email
    private String email;

    @Size(min=8)
    @NotNull
    private String hashLozinke;
    @NotNull
    private String ime;
    @NotNull
    private String prezime;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "korisnik_roles",
    joinColumns = @JoinColumn(name = "email", referencedColumnName = "email"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles;



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
