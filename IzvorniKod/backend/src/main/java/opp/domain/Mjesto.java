package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import java.io.Serializable;

@Entity
@Table(name = "mjesto")
@IdClass(Adresa.class)
@Data

public class Mjesto implements Serializable {
/*
 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mjestoID;

 */

    @Id
    @NotNull
    private String ulica;

    @Id
    @NotNull
    private Long kucBroj;

    @NotNull
    private Long pbr;

    @NotNull
    private String nazivMjesta;






}
