package opp.service.impl;

import opp.dao.FotoMaterijalRepo;
import opp.dao.PosterRepo;
import opp.domain.FotoMaterijal;
import opp.service.FotoMaterijalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FotoMaterijalServiceJpa implements FotoMaterijalService {

    @Autowired
    private FotoMaterijalRepo fotoMaterijalRepo;
    @Override
    public FotoMaterijal save(FotoMaterijal foto) {
        return fotoMaterijalRepo.save(foto);
    }

    @Override
    public FotoMaterijal viewById(long id) {
        return fotoMaterijalRepo.findById(id).get();
    }
}
