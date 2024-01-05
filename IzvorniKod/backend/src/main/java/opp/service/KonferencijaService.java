package opp.service;

import opp.domain.Konferencija;
import java.util.*;

public interface KonferencijaService {
    Konferencija findByKonfid(Long Konfid);

    Konferencija findByPassword (String pass);

    void addKonferencija(Konferencija konf);

    List<Konferencija> listAll();

    boolean checkirajKonf(String password, Konferencija existingOne);
}

