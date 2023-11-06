package opp.service.impl;

import opp.dao.KonferencijaRepo;
import opp.domain.Konferencija;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KonferencijaServiceJpa implements KonferencijaService {
//Autowired označava da se samo to sve nekako magično spoji s ostalim glupostima

    @Autowired
    private KonferencijaRepo konfRepo;

    @Override
    public List<Konferencija> listAll() {
        return konfRepo.findAll();
    }

    @Override
    public void addKonferencija(Konferencija konf) {
        konfRepo.save(konf);
    }
}

