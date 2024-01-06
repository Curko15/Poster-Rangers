package opp.dao;

import opp.domain.Konferencija;
import opp.domain.Poster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PosterRepo extends JpaRepository<Poster, Long> {

    Poster findByPosterId(Long posterId);
}
