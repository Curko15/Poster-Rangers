package opp.dao;

import opp.domain.Konferencija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KonferencijaRepo extends JpaRepository<Konferencija, Long> {
    //U <> upisujemo tip entiteta i tip ID-a
}
