package opp.service.impl;

import lombok.AllArgsConstructor;
import opp.dao.KorisnikRepo;
import opp.dao.RoleRepo;
import opp.domain.AuthenticationResponse;
import opp.domain.Korisnik;
import opp.domain.LoginDto;
import opp.domain.Role;
import opp.security.JwtService;
import opp.service.KorisnikService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class KorisnikServiceJpa implements KorisnikService {

    private  KorisnikRepo korisnikRepo;
    private  RoleRepo roleRepo;
    private  BCryptPasswordEncoder passwordEncoder;
    private JwtService jwtService;
    private AuthenticationManager authenticationManager;

    @Override
    public Korisnik save(Korisnik korisnik) {
        korisnik.setPassword(passwordEncoder.encode(korisnik.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_KORISNIK");
        roles.add(userRole);
        korisnik.setRoles(roles);
        return korisnikRepo.save(korisnik);
    }

    public Korisnik justSave(Korisnik korisnik){
        return  korisnikRepo.save(korisnik);
    }


    @Override
    public AuthenticationResponse saveAdmin(Korisnik korisnik) {
        korisnik.setPassword(passwordEncoder.encode(korisnik.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_ADMIN");
        roles.add(userRole);
        korisnik.setRoles(roles);
        korisnikRepo.save(korisnik);
        var jwtToken = jwtService.generateToken(korisnik);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public Korisnik saveSuperAdmin(Korisnik korisnik) {
        korisnik.setPassword(passwordEncoder.encode(korisnik.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_SUPERADMIN");
        roles.add(userRole);
        korisnik.setRoles(roles);
        return korisnikRepo.save(korisnik);
    }

    @Override
    public boolean checkLozinka(String lozinka, Korisnik korisnik) {
        return passwordEncoder.matches(lozinka, korisnik.getPassword());
    }

    @Override
    public Korisnik findByEmail(String email) {
        return korisnikRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Korisnik not found"));
    }

    @Override
    public Korisnik findByResetPasswordToken(String token) {
        return korisnikRepo.findByResetPasswordToken(token).orElseThrow(() -> new UsernameNotFoundException("Korisnik not found"));
    }

    @Override
    public List<Korisnik> listAll() {
        return korisnikRepo.findAll();
    }

    @Override
    public AuthenticationResponse register(Korisnik korisnik) {
        korisnik.setPassword(passwordEncoder.encode(korisnik.getPassword()));
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepo.findByName("ROLE_KORISNIK");
        roles.add(userRole);
        korisnik.setRoles(roles);
        korisnikRepo.save(korisnik);
        var jwtToken = jwtService.generateToken(korisnik);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse authenticate(LoginDto loginDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        var korisnik = korisnikRepo.findByEmail(loginDto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Korisnik not found"));
        var jwtToken = jwtService.generateToken(korisnik);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public void updateResetPasswordToken(String token, String email) {
        Korisnik korisnik = korisnikRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Korisnik not found"));
        korisnik.setResetPasswordToken(token);
        korisnikRepo.save(korisnik);
    }

    @Override
    public void updatePassword(Korisnik korisnik, String novaLozinka) {
        String encodedPassword = passwordEncoder.encode(novaLozinka);

        korisnik.setPassword(encodedPassword);
        korisnik.setResetPasswordToken(null);
        korisnikRepo.save(korisnik);
    }
}