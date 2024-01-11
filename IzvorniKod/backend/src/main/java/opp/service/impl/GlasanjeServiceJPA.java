package opp.service.impl;

import jakarta.transaction.Transactional;
import opp.dao.GlasanjeRepo;
import opp.dao.PosterRepo;
import opp.domain.Glasanje;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.domain.Poster;
import opp.service.GlasanjeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class GlasanjeServiceJPA implements GlasanjeService {
    @Autowired
    private GlasanjeRepo glasanjeRepo;

    @Autowired
    private PosterRepo posterRepo;

    @Override
    public Glasanje save(Glasanje glas) {return glasanjeRepo.save(glas);}

    @Transactional
    public void deleteGlasanje(Korisnik korisnik, Konferencija konferencija) {
        glasanjeRepo.deleteByKorisnikAndKonferencija(korisnik, konferencija);
    }

    @Override
    public List<Glasanje> listAll() {
        return (List<Glasanje>) glasanjeRepo.findAll();
    }

    @Override
    public Map<Poster, Integer> MapPoredak(Long konfid) {
        List<Glasanje> lista = listAll();

        Map<Poster, Integer> poredak = new HashMap<>();

        for(Glasanje glas : lista){
            if(Objects.equals(glas.getKonferencija().getKonfid(), konfid)){
                Poster poster = posterRepo.findByPosterId(glas.getPosterId());
                if(!poredak.containsKey(poster)){
                    poredak.put(poster, 1);
                } else {
                    poredak.put(poster, poredak.get(poster) + 1);
                }
            }
        }

        List<Poster> ostali = posterRepo.findAll();
        for (Poster poster : ostali){
            if(Objects.equals(poster.getKonferencija().getKonfid(), konfid)){
                if(!poredak.containsKey(poster)){
                    poredak.put(poster, 0);
                }
            }
        }

        return poredak.entrySet()
                .stream()
                .sorted(Map.Entry.<Poster, Integer>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }
}
