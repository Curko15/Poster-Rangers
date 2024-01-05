package opp.dao;

import opp.domain.Konferencija;
import org.springframework.data.repository.CrudRepository;

public interface KonferencijaRepo extends CrudRepository<Konferencija, Long> {
    Konferencija findByKonfid(Long Konfidd);
    Konferencija findByPassword(String psic);
}
