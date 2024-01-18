package opp;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import opp.dao.KorisnikRepo;
import opp.dao.RoleRepo;
import opp.domain.*;
import opp.rest.KonferencijaController;
import opp.rest.KorisnikController;
import opp.rest.MjestoController;
import opp.rest.PosterController;
import opp.security.JwtService;
import opp.service.KonferencijaService;
import opp.service.MjestoService;
import opp.service.impl.KorisnikServiceJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

	@Mock
	private KonferencijaService konferencijaService;

	@InjectMocks
	private KonferencijaController konferencijaController;

	@InjectMocks
	private KorisnikController korisnikController;

	@Mock
	private MjestoService mjestoService;

	@Mock
	private AuthenticationManager authenticationManager;

	@InjectMocks
	private PosterController posterController;

	@InjectMocks
	private MjestoController mjestoController;


	@Test
	void contextLoads() {
	}

	@Test
	void KorisnikCreateTest(){
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

	@Test
	public void testLoginKonf() {
		// Given
		String password = "testPassword";
		// Assuming a Konferencija object should be returned when the service is called
		// You can replace this with your actual expected result
		Konferencija expectedKonferencija = new Konferencija();
		when(konferencijaService.findByPassword(password)).thenReturn(expectedKonferencija);

		// When
        try {
            ResponseEntity<?> responseEntity = konferencijaController.loginKonf("{\"password\":\"" + password + "\"}");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // Then
		verify(konferencijaService).findByPassword(password);
		// You can further verify the status code or other aspects of the response if needed
		// For example, if you expect HttpStatus.OK:
		// assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}


	@Test
	public void testUnsuccessfulLoginKonf() {
		// Given
		String password = "incorrectPassword";
		// Simulate an unsuccessful login by returning null
		when(konferencijaService.findByPassword(password)).thenReturn(null);

		// When
        ResponseEntity<?> responseEntity = null;
        try {
            responseEntity = konferencijaController.loginKonf("{\"password\":\"" + password + "\"}");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        // Then
		verify(konferencijaService).findByPassword(password);
		// Verify that the response is HttpStatus.UNAUTHORIZED
		assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
		// You can further verify other aspects of the response if needed
	}

	@Test
	public void testGetAllKonf() {
		// Given
		// Assuming a list of Konferencija objects should be returned when the service is called
		// You can replace this with your actual expected result
		List<Konferencija> expectedKonferencije = Arrays.asList(new Konferencija(), new Konferencija());
		when(konferencijaService.listAll()).thenReturn(expectedKonferencije);

		// When
		ResponseEntity<List<Konferencija>> responseEntity = konferencijaController.getAllKonf();

		// Then
		verify(konferencijaService, times(2)).listAll();

		// You can further verify the status code or other aspects of the response if needed
		// For example, if you expect HttpStatus.OK:
		// assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}

	@Test
	public void testGetLocation() {
		// Given
		long konferencijaId = 1L;
		// Assuming a Konferencija object should be returned when the service is called
		// You can replace this with your actual expected result
		Konferencija expectedKonferencija = new Konferencija();
		Mjesto expectedMjesto = new Mjesto(); // Assuming a Mjesto object should be returned
		expectedKonferencija.setMjesto(expectedMjesto);
		when(konferencijaService.findByKonfid(konferencijaId)).thenReturn(expectedKonferencija);

		// When
		ResponseEntity<?> responseEntity = konferencijaController.getLocation(konferencijaId);

		// Then
		verify(konferencijaService).findByKonfid(konferencijaId);
		// You can further verify the status code or other aspects of the response if needed
		// For example, if you expect HttpStatus.OK:
		// assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	}


	@Test
	void testAddKonf() {
		// Priprema
		Mjesto mjesto = new Mjesto();
		// Postavite svoje podatke za mjesto ako je potrebno

		// Akcija
		ResponseEntity<String> responseEntity = mjestoController.addKonf(mjesto);

		// Verifikacija
		Mockito.verify(mjestoService).addKonferencija(any(Mjesto.class));
		// Verificiramo da je metoda addKonferencija pozvana s bilo kojim objektom tipa Mjesto

		// Opcionalno: Provjerite status odgovora
		assert responseEntity.getStatusCode() == HttpStatus.CREATED;
		// Ako želite koristiti verify, promijenite ovaj dio prema Mockito.verify
	}




}
