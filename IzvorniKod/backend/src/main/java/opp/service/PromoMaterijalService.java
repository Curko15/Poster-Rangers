package opp.service;

import opp.domain.Poster;
import opp.domain.PromoMaterijal;

public interface PromoMaterijalService {

    PromoMaterijal save(PromoMaterijal promo);

    public PromoMaterijal viewById(long id);
}
