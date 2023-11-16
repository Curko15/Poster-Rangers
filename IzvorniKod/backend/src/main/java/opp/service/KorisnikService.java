package opp.service;

import opp.domain.AuthenticationResponse;
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

    public AuthenticationResponse register(Korisnik korisnik);

    public AuthenticationResponse authenticate(LoginDto loginDto);

   // String login(LoginDto loginDto);
}
