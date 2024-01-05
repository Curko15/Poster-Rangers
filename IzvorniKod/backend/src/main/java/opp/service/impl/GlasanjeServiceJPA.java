package opp.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import opp.dao.GlasanjeRepo;
import opp.dao.KonferencijaRepo;
import opp.dao.KorisnikRepo;
import opp.domain.Glasanje;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.service.GlasanjeService;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class GlasanjeServiceJPA implements GlasanjeService {
    @Autowired
    private GlasanjeRepo glasanjeRepo;


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

        Map<Long, Integer> sortiraniPoredak = poredak.entrySet()
                .stream()
                .sorted(Map.Entry.<Long, Integer>comparingByValue().reversed())
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));



        return sortiraniPoredak;
    }


}
