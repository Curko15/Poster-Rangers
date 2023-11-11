package opp;


import opp.dao.RoleRepo;
import opp.domain.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@SpringBootApplication
public class TeamsBackendApplication {

	@Autowired
	private RoleRepo brt;

	public static void main(String[] args) {
		SpringApplication.run(TeamsBackendApplication.class, args);
		//inicilizaijraj();

	}


	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
		return new MvcRequestMatcher.Builder(introspector);
	}


	@Bean
	public CommandLineRunner initializeRoles() {
		return args -> {
			initializeRole("ROLE_KORISNIK");
			initializeRole("ROLE_ADMIN");
		};
	}

	private void initializeRole(String roleName) {
		Role existingRole = brt.findByName(roleName);
		if (existingRole == null) {
			Role role = new Role();
			role.setName(roleName);
			brt.save(role);
		}
	}
}
