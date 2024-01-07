package opp.service.impl;

import opp.dao.PromoMaterijalRepo;
import opp.domain.PromoMaterijal;
import opp.service.PromoMaterijalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromoMaterijalServiceJpa implements PromoMaterijalService {

    @Autowired
    private PromoMaterijalRepo promoMaterijalRepo;

    @Override
    public PromoMaterijal save(PromoMaterijal promo) {
        return promoMaterijalRepo.save(promo);
    }

    @Override
    public PromoMaterijal viewById(long id) {
        return promoMaterijalRepo.findById(id).get();
    }
}