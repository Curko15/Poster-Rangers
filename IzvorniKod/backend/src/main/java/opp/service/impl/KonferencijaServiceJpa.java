package opp.service.impl;

import opp.dao.KonferencijaRepo;
import opp.domain.Konferencija;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KonferencijaServiceJpa implements KonferencijaService {

    @Autowired
    private KonferencijaRepo konfRepo;

    @Override
    public void addKonferencija(Konferencija konf) {
        konfRepo.save(konf);
    }
}

