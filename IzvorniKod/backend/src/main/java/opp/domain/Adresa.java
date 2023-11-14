package opp.domain;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
@Embeddable
public class Adresa implements Serializable {
    public String ulica;
    public Long kucBroj;

    public Adresa() {
        // Prazan konstruktor
    }
}
