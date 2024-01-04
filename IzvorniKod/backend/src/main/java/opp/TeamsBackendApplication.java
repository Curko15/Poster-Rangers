package opp;


import opp.dao.RoleRepo;
import opp.domain.Korisnik;
import opp.domain.Role;
import opp.service.EmailSenderService;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class TeamsBackendApplication {

	@Autowired
	private EmailSenderService senderService;
	@Autowired
	private KorisnikService korisnikService;
	@Autowired
	private RoleRepo roleRepo;


	public static void main(String[] args) {
		SpringApplication.run(TeamsBackendApplication.class, args);
		//inicilizaijraj();

	}

	/*@EventListener(ApplicationReadyEvent.class)
	public void sendMail(){
		senderService.sendEmail("curkovicm4@gmail.com", "This is Subject",
				"This is Body of Email");
	}
*/
	@Bean
	public CommandLineRunner initializeRoles() {
		return args -> {
			initializeRole("ROLE_KORISNIK");
			initializeRole("ROLE_ADMIN");
			initializeRole("ROLE_SUPERADMIN");

			Korisnik superadmin = new Korisnik("superadmin@gmail.com", "1234567", "superadmin", "superprezime", null, null);
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
