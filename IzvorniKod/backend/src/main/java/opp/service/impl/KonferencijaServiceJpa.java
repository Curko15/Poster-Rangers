package opp.service.impl;

import opp.dao.KonferencijaRepo;
import opp.domain.Konferencija;
import opp.domain.Korisnik;
import opp.domain.Poster;
import opp.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BrokenBarrierException;
import java.util.stream.Collectors;

@Service
public class KonferencijaServiceJpa implements KonferencijaService {
    //Autowired označava da se samo to sve nekako magično spoji s ostalim glupostima
    @Autowired
    private KonferencijaRepo konfRepository;

    @Autowired
    private GlasanjeService glasanjeService;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private PosterService posterService;

    @Autowired
    private KorisnikService korisnikService;

    public KonferencijaServiceJpa(KonferencijaRepo konfRepo, BCryptPasswordEncoder passwordEncoder, GlasanjeService glasanjeService,
                                  EmailSenderService emailSenderService, PosterService posterService,KorisnikService korisnikService) {
        this.konfRepository = konfRepo;
        this.passwordEncoder = passwordEncoder;
        this.glasanjeService = glasanjeService;
        this.emailSenderService = emailSenderService;
        this.posterService = posterService;
        this.korisnikService = korisnikService;
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

    //Metoda koja se poziva svakih 24 sata (86400000 milisekundi)
    @Scheduled(fixedRate =86400000)
    public void checkConferenceStatus() {
       //Implementacija logike za provjeru i označavanje završenih konferencija
       //Ovdje ćete provjeriti datume konferencija i označiti ih kao završene ako su prošle.
        List<Konferencija> konferencijaList = (List<Konferencija>) konfRepository.findAll();
        if(konferencijaList.size() == 0) return;
        konferencijaList = konferencijaList.stream()
                .filter(Konferencija::isAktivna) // Filtriraj samo aktivne konferencije
                .collect(Collectors.toList());

        if(konferencijaList.size() != 0){
            for(Konferencija konferencija :  konferencijaList){
                    if(LocalDateTime.now().isAfter(konferencija.getEndTime())){
                        konferencija.setAktivna(false);
                        konfRepository.save(konferencija);
                        sendMails(konferencija.getKonfid());

                    }
            }
        }

       //System.out.println("Metoda checkConferenceStatus se izvodi u dretvi s ID-om: " + Thread.currentThread().getId());
    }

    private void sendMails(Long konfid) {
        Map<Poster, Integer> mapa = glasanjeService.MapPoredak(konfid);
        List<Map.Entry<Poster, Integer>> entryList = new ArrayList<>(mapa.entrySet());
        Konferencija konferencija = konfRepository.findByKonfid(konfid);

        for (int i = 0; i < entryList.size(); i++) {
            Map.Entry<Poster, Integer> entry = entryList.get(i);
            Long idPostera = entry.getKey().getPosterId();
            Integer brojGlasova = entry.getValue();

            if(i < 3){
                slanjeMailPrvojTrojici(i, idPostera, brojGlasova, konferencija);
            }else{
                slanjeSudionicima(i, idPostera, brojGlasova, konferencija);
            }
        }
    }

    private void slanjeSudionicima(int i, Long idPostera, Integer brojGlasova, Konferencija konferencija) {
        Poster poster = posterService.findByPosterId(idPostera);
        LocalDateTime vrijeme = konferencija.getEndTime().plusWeeks(2);
        String mailContent = "Poštovani " + poster.getImeAutor() + " " + poster.getPrezimeAutor() + ",\n\n" +
                "S velikim zadovoljstvom Vas obavještavamo da ste osvojili "+ (i+1) + ". mjesto sa "+ brojGlasova + "glasova na našoj nedavno održanoj konferenciji. Vaše izuzetno izlaganje istaknulo se među ostalim sudionicima, te smo uvjereni da ste zaslužili ovo priznanje.\n\n" +
                "S obzirom na Vaš izniman doprinos konferenciji, pozivamo Vas na svečanu dodjelu nagrada, kako bi vam predali vašu nagradu, koja će se održati " + vrijeme + " na "+ konferencija.getMjesto().getUlica() + " " + konferencija.getMjesto().getKucBroj() +  ", " + konferencija.getMjesto().getNazivMjesta() + ".\n\n" +
                "S poštovanjem,\n" +
                "Poster Rangersi";

        String subject = "Poziv na dodjelu nagrada";
        emailSenderService.sendEmail(poster.getEmailAutor(), subject, mailContent);

    }

    private void slanjeMailPrvojTrojici(int i, Long idPostera, Integer brojGlasova, Konferencija konferencija) {
        Poster poster = posterService.findByPosterId(idPostera);
        LocalDateTime vrijeme = konferencija.getEndTime().plusWeeks(2);
        String mailContent = "Poštovani " + poster.getImeAutor() + " " + poster.getPrezimeAutor() + ",\n\n" +
                "S velikim zadovoljstvom Vas obavještavamo da ste završili na  "+ (i+1) + ". mjestu sa "+ brojGlasova + "glasova na našoj nedavno održanoj konferenciji. Zahvaljujemo Vam se na sudjelovanju, te smo uvjereni da će te se ponovo prijaviti.\n\n" +
                "S obzirom na Vaš izniman doprinos konferenciji, pozivamo Vas na svečanu dodjelu nagrada koja će se održati " + vrijeme + " na "+ konferencija.getMjesto().getUlica() + " " + konferencija.getMjesto().getKucBroj() +  ", " + konferencija.getMjesto().getNazivMjesta() + ".\n\n" +
                "S poštovanjem,\n" +
                "Poster Rangersi";

        String subject = "Poziv na dodjelu nagrada";
        emailSenderService.sendEmail(poster.getEmailAutor(), subject, mailContent);
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