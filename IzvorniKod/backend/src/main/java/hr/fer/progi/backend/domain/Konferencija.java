package hr.fer.progi.backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;


@Data
@Entity
@Table(name = "konferencija")
public class Konferencija {

    @Id
    @GeneratedValue
    private Long Id;

    private String password;

    private String ime;

    private LocalDate startTime;

    private LocalDate endTime;

    @OneToMany(mappedBy = "konferencija")
    private List<Korisnik> korisnici;
}
