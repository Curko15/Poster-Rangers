package opp.service;

import opp.dao.GlasanjeRepo;
import opp.domain.Glasanje;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public interface GlasanjeService {
    Glasanje save(Glasanje glas);

    void deleteGlasanje(Korisnik korisnik, Konferencija konferencija);

    List<Glasanje> listAll();
    Map<Long, Integer> MapPoredak(Long konfid);


}