package opp.dao;

import opp.domain.Korisnik;
import opp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepo extends JpaRepository<Korisnik, String> {
//U <> upisujemo tip entiteta i tip ID-a
    Korisnik findByEmail(String email);
}
