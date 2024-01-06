package opp.service;

import opp.domain.FotoMaterijal;
import opp.domain.Poster;

public interface FotoMaterijalService {

    FotoMaterijal save(FotoMaterijal foto);

    public FotoMaterijal viewById(long id);
}
