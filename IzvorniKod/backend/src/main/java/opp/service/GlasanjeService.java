package opp.service;

import opp.dao.GlasanjeRepo;
import opp.domain.Glasanje;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import org.springframework.beans.factory.annotation.Autowired;

public interface GlasanjeService {
    Glasanje save(Glasanje glas);

    void deleteGlasanje(Korisnik korisnik, Konferencija konferencija);


}