package opp.dao;

import opp.domain.Adresa;
import opp.domain.Glasanje;
import opp.domain.Mjesto;
import opp.domain.glasanjeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GlasanjeRepo extends JpaRepository<Glasanje, glasanjeId>  {

}
