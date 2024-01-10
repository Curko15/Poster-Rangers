package opp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "Konferencija")
public class Konferencija{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long konfid;
    @NotNull
    private String password;
    @NotNull
    private String live;
    @NotNull
    private String ime;
    @NotNull
    private LocalDateTime startTime;
    @NotNull
    private LocalDateTime endTime;

    private boolean aktivna;

    @JsonIgnore
    @OneToMany(mappedBy = "konferencija")
    private List<FotoMaterijal> fotke;

    @JsonIgnore
    @OneToMany(mappedBy = "konferencija")
    private List<PromoMaterijal> promo;

    @JsonIgnore
    @OneToMany(mappedBy = "konferencija")
    private List<Poster> posteri;

    @ManyToOne
    private Mjesto mjesto;

    @ManyToOne
    private Korisnik korisnik;
}