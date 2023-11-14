package opp.dao;

import opp.domain.Mjesto;
import org.springframework.data.jpa.repository.JpaRepository;



public interface MjestoRepo extends JpaRepository<Mjesto, Long> {
}
