package hr.fer.progi.backend.service.impl;

import hr.fer.progi.backend.dao.KonferencijaRepo;
import hr.fer.progi.backend.domain.Konferencija;
import hr.fer.progi.backend.service.KonferencijaService;
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

