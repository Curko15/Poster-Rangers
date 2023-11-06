package opp.dao;

import opp.domain.FotoMaterijal;
import opp.domain.Konferencija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FotoMaterijalRepo extends JpaRepository<FotoMaterijal, Integer> {
    //U <> upisujemo tip entiteta i tip ID-a
}
