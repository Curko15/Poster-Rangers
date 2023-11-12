package opp.service.impl;

import opp.dao.KorisnikRepo;
import opp.service.PosterService;
import org.springframework.beans.factory.annotation.Autowired;

public class PosterServiceJpa implements PosterService {
    @Autowired
    private KorisnikRepo korisnikRepo;
}
