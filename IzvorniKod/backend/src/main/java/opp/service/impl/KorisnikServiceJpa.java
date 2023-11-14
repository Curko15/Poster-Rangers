package opp.service.impl;

import lombok.AllArgsConstructor;
import opp.dao.KorisnikRepo;
import opp.dao.RoleRepo;
import opp.domain.Korisnik;
import opp.domain.LoginDto;
import opp.domain.Role;
import opp.service.KorisnikService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class KorisnikServiceJpa implements KorisnikService {

    private KorisnikRepo korisnikRepo;
    private RoleRepo roleRepo;
    private final BCryptPasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;

    @Override
    public Korisnik save(Korisnik korisnik) {
        korisnik.setHashLozinke(passwordEncoder.encode(korisnik.getHashLozinke()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_KORISNIK");
        roles.add(userRole);
        korisnik.setRoles(roles);
        return korisnikRepo.save(korisnik);
    }

    @Override
    public Korisnik saveAdmin(Korisnik korisnik) {
        korisnik.setHashLozinke(passwordEncoder.encode(korisnik.getHashLozinke()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_ADMIN");
        roles.add(userRole);
        korisnik.setRoles(roles);
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

    @Override
    public List<Korisnik> listAll() {
        return korisnikRepo.findAll();
    }

    @Override
    public String login(LoginDto loginDto) {
       Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
            loginDto.getEmail(),
            loginDto.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return "User logged-in successfully!";
    }
}