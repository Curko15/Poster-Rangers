package opp.service;

import opp.domain.Mjesto;

public interface MjestoService {
    Mjesto save(Mjesto mjesto);

    void addKonferencija(Mjesto mjesto);
}
