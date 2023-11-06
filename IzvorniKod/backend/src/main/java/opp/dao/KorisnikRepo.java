package opp.dao;

import opp.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepo extends JpaRepository<Korisnik, String> {

}
