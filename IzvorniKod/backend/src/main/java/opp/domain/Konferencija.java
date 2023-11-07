package opp.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;


@Data
@Entity
@Table(name = "Konferencija")
public class Konferencija{

    @Id
    @GeneratedValue
    private Long Id;

    private String password;

    private String ime;

    private LocalDate startTime;

    private LocalDate endTime;

    @OneToMany(mappedBy = "konferencija")
    private List<Korisnik> korisnici;

    @OneToMany(mappedBy = "konferencija")
    private List<FotoMaterijal> fotke;





}