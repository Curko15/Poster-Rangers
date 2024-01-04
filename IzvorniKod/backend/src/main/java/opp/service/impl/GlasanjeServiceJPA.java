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


}
