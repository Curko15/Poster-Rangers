package opp.service;

import opp.domain.Korisnik;

public interface KorisnikService {

    Korisnik save(Korisnik korisnik);

    boolean checkLozinka(String lozinka, Korisnik korisnik);

    Korisnik findByEmail(String email);
}
