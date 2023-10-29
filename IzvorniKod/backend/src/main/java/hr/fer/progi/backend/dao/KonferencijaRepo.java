package hr.fer.progi.backend.dao;

import hr.fer.progi.backend.domain.Konferencija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KonferencijaRepo extends JpaRepository<Konferencija, Long> {
}
