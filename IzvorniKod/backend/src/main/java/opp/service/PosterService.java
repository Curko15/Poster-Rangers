package opp.service;

import opp.domain.Poster;

public interface PosterService {
    Poster save(Poster poster);

    public Poster viewById(long id);
}
