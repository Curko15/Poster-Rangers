package hr.fer.progi.backend.dao;

import hr.fer.progi.backend.domain.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepo extends JpaRepository<Korisnik, String> {

}
