package opp.service;

import opp.domain.AuthenticationResponse;
import opp.domain.Korisnik;
import opp.domain.LoginDto;

import java.util.List;

public interface KorisnikService {

    Korisnik save(Korisnik korisnik);

    AuthenticationResponse saveAdmin(Korisnik korisnik);

    Korisnik saveSuperAdmin(Korisnik korisnik);

    boolean checkLozinka(String lozinka, Korisnik korisnik);

    Korisnik findByEmail(String email);

    Korisnik findByResetPasswordToken(String token);

    List<Korisnik> listAll();

    AuthenticationResponse register(Korisnik korisnik);

    AuthenticationResponse authenticate(LoginDto loginDto);

    void updateResetPassword(String token, String email);

    void updatePassword(Korisnik korisnik, String novaLozinka);
}
