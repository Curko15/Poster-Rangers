package opp.dao;

import opp.domain.Konferencija;
import opp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface KonferencijaRepo extends CrudRepository<Konferencija, Long> {
    //U <> upisujemo tip entiteta i tip ID-a

    Konferencija findByKonfid(Long Konfidd);
    Konferencija findByPassword(String psic);
}
