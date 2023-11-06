package opp.dao;

import opp.domain.Konferencija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KonferencijaRepo extends JpaRepository<Konferencija, Long> {
}
