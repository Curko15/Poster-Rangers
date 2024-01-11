package opp.service;

import opp.domain.Glasanje;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.domain.Poster;

import java.util.List;
import java.util.Map;

public interface GlasanjeService {
    Glasanje save(Glasanje glas);

    void deleteGlasanje(Korisnik korisnik, Konferencija konferencija);

    List<Glasanje> listAll();

    Map<Poster, Integer> MapPoredak(Long konfid);


}