package opp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Mjesto {

    @Id
    @Column(unique = true)
    @NotNull
    private Long pbr;

    @NotNull
    private String nazivMjesta;

    @NotNull
    private String ulica;

    @NotNull
    private int kucBroj;

    @OneToMany(mappedBy = "mjesto")
    private List<Konferencija> konferencijaList;




}
