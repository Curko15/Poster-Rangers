package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;



import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name = "Konferencija")
public class Konferencija{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long konfid;
    @NotNull
    private String password;
    @NotNull
    private String ime;
    @NotNull
    private LocalDateTime startTime;
    @NotNull
    private LocalDateTime endTime;

    private boolean aktivna;

    @OneToMany(mappedBy = "konferencija")
    private List<FotoMaterijal> fotke;

    @OneToMany(mappedBy = "konferencija")
    private List<PromoMaterijal> promo;

    @OneToMany(mappedBy = "konferencija")
    private List<Poster> posteri;

    @ManyToOne
    private Mjesto mjesto;

    @ManyToOne
    private Korisnik korisnik;



}