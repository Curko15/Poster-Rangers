package opp.service;

import opp.domain.Korisnik;
import opp.domain.LoginDto;

import java.util.List;

public interface KorisnikService {

    Korisnik save(Korisnik korisnik);

    Korisnik saveAdmin(Korisnik korisnik);

    Korisnik saveSuperAdmin(Korisnik korisnik);

    boolean checkLozinka(String lozinka, Korisnik korisnik);

    Korisnik findByEmail(String email);

    List<Korisnik> listAll();

    String login(LoginDto loginDto);
}
