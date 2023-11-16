package opp;


import opp.dao.RoleRepo;
import opp.domain.Korisnik;
import opp.domain.Role;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class TeamsBackendApplication {

	private KorisnikService korisnikService;
	private RoleRepo roleRepo;


	public static void main(String[] args) {
		SpringApplication.run(TeamsBackendApplication.class, args);
		//inicilizaijraj();

	}

	@Autowired
	@Lazy
	public TeamsBackendApplication(RoleRepo roleRepo, KorisnikService korisnikService) {
		this.roleRepo = roleRepo;
		this.korisnikService = korisnikService;
	}

	@Bean
	public CommandLineRunner initializeRoles() {
		return args -> {
			initializeRole("ROLE_KORISNIK");
			initializeRole("ROLE_ADMIN");
			initializeRole("ROLE_SUPERADMIN");

			Korisnik superadmin = new Korisnik("superadmin@gmail.com", "1234567", "superadmin", "superprezime", null);
			korisnikService.saveSuperAdmin(superadmin);
		};
	}
	private void initializeRole(String roleName) {
		Role existingRole = roleRepo.findByName(roleName);
		if (existingRole == null) {
			Role role = new Role();
			role.setName(roleName);
			roleRepo.save(role);
		}
	}
}
