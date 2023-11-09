package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;


@Data
@Entity
@Table(name = "Konferencija")
public class Konferencija{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Konfid;
    @NotNull
    private String password;
    @NotNull
    private String ime;
    @NotNull
    private LocalDate startTime;
    @NotNull
    private LocalDate endTime;
    @NotNull
    private String nazivKonf;
    @NotNull
    private String mjestoKonf;


    @OneToMany(mappedBy = "konferencija")
    private List<FotoMaterijal> fotke;

    @OneToMany(mappedBy = "konferencija")
    private List<FotoMaterijal> promo;









}