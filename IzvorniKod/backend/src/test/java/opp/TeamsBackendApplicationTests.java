package opp;
import opp.dao.KorisnikRepo;
import opp.dao.RoleRepo;
import opp.domain.Korisnik;
import opp.domain.Role;
import opp.security.JwtService;
import opp.service.impl.KorisnikServiceJpa;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.HashSet;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;



@SpringBootTest
class TeamsBackendApplicationTests {

	@Mock
	private KorisnikRepo korisnikRepo;

	@Mock
	private RoleRepo roleRepo;

	@Mock
	private BCryptPasswordEncoder passwordEncoder;

	@Mock
	private JwtService jwtService;

	@InjectMocks
	private KorisnikServiceJpa korisnikService;


	@Test
	void contextLoads() {
	}

	@Test
	void KorisnikTest(){
		// Arrange
		Korisnik korisnik = new Korisnik();
		korisnik.setEmail("test@example.com");
		korisnik.setPassword("password");


		// Mockovanje poziva repozitorijuma i enkodera
		when(passwordEncoder.encode(any())).thenReturn("encodedPassword");
		when(korisnikRepo.save(any())).thenReturn(korisnik);

		// Act
		Korisnik savedKorisnik = korisnikService.save(korisnik);

		// Assert
		verify(roleRepo, times(1)).findByName("ROLE_KORISNIK");
		verify(passwordEncoder, times(1)).encode("password");
		verify(korisnikRepo, times(1)).save(any());
		// Dodajte ostale potrebne provere zavisno od vaših poslovnih pravila i očekivanja

	}


}
