package opp.rest;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import opp.domain.Konferencija;
import opp.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import opp.service.KonferencijaService;
import java.util.List;

@Data
@RestController
@CrossOrigin("*")
@RequestMapping("/konferencija")
public class KonferencijaController {

    @Autowired
    private KonferencijaService konfService;



    //@PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addKonf")
    public ResponseEntity<String> addKonf(@RequestBody Konferencija konf){
        konfService.addKonferencija(konf);
        return new ResponseEntity<>("Konferencija created successfully", HttpStatus.CREATED);
    }




    @PostMapping("/loginKonf")
    public ResponseEntity<String> loginKonf(@RequestBody String pass) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(pass);

        String password = jsonNode.get("password").asText();


        Konferencija existingOne = konfService.findByPassword(password);

        if (existingOne != null) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
