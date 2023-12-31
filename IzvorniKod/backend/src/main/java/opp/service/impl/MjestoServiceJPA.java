package opp.service.impl;

import opp.dao.KorisnikRepo;
import opp.dao.MjestoRepo;
import opp.dao.PosterRepo;
import opp.domain.Konferencija;
import opp.domain.Mjesto;
import opp.domain.Poster;
import opp.service.MjestoService;
import opp.service.PosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MjestoServiceJPA implements MjestoService {

    @Autowired
    private MjestoRepo mjestoRepo;

    @Override
    public Mjesto save(Mjesto mjesto) {
        return mjestoRepo.save(mjesto);
    }

    @Override
    public void addKonferencija(Mjesto mjesto) {
        mjestoRepo.save(mjesto);
    }




}
