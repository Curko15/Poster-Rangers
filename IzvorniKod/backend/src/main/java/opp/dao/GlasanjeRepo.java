package opp.dao;

import opp.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GlasanjeRepo extends JpaRepository<Glasanje, glasanjeId>  {

    void deleteByKorisnikAndKonferencija(Korisnik korisnik, Konferencija konferencija);

}
