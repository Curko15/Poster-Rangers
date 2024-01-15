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
        return glasanjeRepo.findAll();
    }

    @Override
    public Map<Long, Integer> MapPoredak(Long konfid) {
        List<Glasanje> lista = listAll();

        Map<Long, Integer> poredak = new HashMap<>();

        for(Glasanje glas : lista){
            if(Objects.equals(glas.getKonferencija().getKonfid(), konfid)){
                if(!poredak.containsKey(glas.getPosterId())){
                    poredak.put(glas.getPosterId(), 1);
                } else {
                    poredak.put(glas.getPosterId(), poredak.get(glas.getPosterId()) + 1);
                }
            }
        }

        List<Poster> ostali = posterRepo.findAll();
        for (Poster poster : ostali){
            if(Objects.equals(poster.getKonferencija().getKonfid(), konfid)){
                if(!poredak.containsKey(poster.getPosterId())){
                    poredak.put(poster.getPosterId(), 0);
                }
            }
        }

        return poredak.entrySet()
                .stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }
}
