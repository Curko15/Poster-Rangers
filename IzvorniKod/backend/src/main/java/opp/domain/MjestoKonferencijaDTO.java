package opp.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MjestoKonferencijaDTO {

    //Sve stvari od Konferencije:

    private String password;

    private String ime;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    //Sve stvari od Mjesta:

    private Long pbr;

    private String nazivMjesta;

    private String ulica;

    private Long kucBroj;

    //Admin
    private String email;
}
