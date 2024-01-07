package opp.dao;

import opp.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface KorisnikRepo extends JpaRepository<Korisnik, String> {
    Optional<Korisnik> findByEmail(String email);
    Optional<Korisnik> findByResetPasswordToken(String token);

}
