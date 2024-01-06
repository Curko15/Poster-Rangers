package opp.service;

import opp.domain.Poster;

public interface PosterService {
    Poster save(Poster poster);

    Poster findByPosterId(Long posterId);
}
