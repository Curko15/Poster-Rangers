package opp.service;

import opp.domain.Konferencija;
import java.util.*;

public interface KonferencijaService {

    List<Konferencija> listAll();

    public void addKonferencija(Konferencija konf);
}

