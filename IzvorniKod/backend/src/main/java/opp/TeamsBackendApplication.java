package opp;


import opp.domain.Konferencija;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class TeamsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamsBackendApplication.class, args);
		//inicilizaijraj();

	}

	/*
	@Bean
	public BCryptPasswordEncoder pswdEncoder(){
		return new BCryptPasswordEncoder();
	}
	*/

	static void inicilizaijraj(){
		Konferencija bata = new Konferencija();
		bata.setIme("kralj");
		bata.setEndTime(LocalDate.ofEpochDay(2));

	}
}
