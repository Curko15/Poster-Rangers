package opp.service.impl;

import opp.dao.KorisnikRepo;
import opp.domain.Korisnik;
import opp.service.KorisnikService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    private KorisnikRepo korisnikRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    public KorisnikServiceJpa(KorisnikRepo korisnikRepo, BCryptPasswordEncoder passwordEncoder) {
        this.korisnikRepo = korisnikRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Korisnik save(Korisnik korisnik) {
        korisnik.setHashLozinke(passwordEncoder.encode(korisnik.getHashLozinke()));
        return korisnikRepo.save(korisnik);
    }

    @Override
    public boolean checkLozinka(String lozinka, Korisnik korisnik) {
        return passwordEncoder.matches(lozinka, korisnik.getHashLozinke());
    }

    @Override
    public Korisnik findByEmail(String email) {
        return korisnikRepo.findByEmail(email);
    }
}