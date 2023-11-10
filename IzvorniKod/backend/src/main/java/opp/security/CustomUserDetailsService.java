package opp.security;

import lombok.AllArgsConstructor;
import opp.dao.KorisnikRepo;
import opp.domain.Korisnik;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

   private  KorisnikRepo korisnikRepo;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Korisnik korisnik = korisnikRepo.findByEmail(email);
        if(korisnik == null){
            throw new UsernameNotFoundException("Korisnik sa predanim mailom ne postoji");
        }
        //spring ocekuje grantedAuthority zato prebacujem
        Set<GrantedAuthority> authorities = korisnik.getRoles().stream()
                .map((role) -> new SimpleGrantedAuthority((role.getName()))).collect(Collectors.toSet());

            return new User(
                    email,
                    korisnik.getHashLozinke(),
                    authorities
            );
    }
}
