package opp.service.impl;

import opp.dao.KonferencijaRepo;
import opp.domain.Konferencija;
import opp.domain.User;
import opp.service.KonferencijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KonferencijaServiceJpa implements KonferencijaService {
//Autowired označava da se samo to sve nekako magično spoji s ostalim glupostima

    @Autowired
    private KonferencijaRepo konfRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public KonferencijaServiceJpa(KonferencijaRepo konfRepo, BCryptPasswordEncoder passwordEncoder) {
        this.konfRepository = konfRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Konferencija findByKonfid(Long Konfid) {
        return konfRepository.findByKonfid(Konfid);
    }

    public Konferencija findByPassword(String pass){
        boolean istina = false;
        Konferencija nova;
        List<Konferencija> idemo = listAll();

        for (Konferencija konfic : idemo){

            if(passwordEncoder.matches(pass, konfic.getPassword())){
                nova = konfic;
                return konfic;
            }

        }
        return null;
    }

    public boolean checkirajKonf(String kralj, Konferencija netko){
        return passwordEncoder.matches(kralj, netko.getPassword());
    }



    @Override
    public void addKonferencija(Konferencija konf) {
        konf.setPassword(passwordEncoder.encode(konf.getPassword()));
        konfRepository.save(konf);
    }

    @Override
    public List<Konferencija> listAll() {
        return (List<Konferencija>) konfRepository.findAll();
    }
}

