package opp.service.impl;

import opp.dao.PosterRepo;
import opp.domain.Poster;
import opp.service.PosterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PosterServiceJpa implements PosterService {
    @Autowired
    private PosterRepo posterRepo;

    @Override
    public Poster save(Poster poster) {
        return posterRepo.save(poster);
    }

    @Override
    public Poster viewById(long id) {
        return posterRepo.findById(id).get();
    }
}