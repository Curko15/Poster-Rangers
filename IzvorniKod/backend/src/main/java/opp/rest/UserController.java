package opp.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import opp.service.impl.UserServiceJPA;
import opp.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserServiceJPA userService;

    public UserController(UserServiceJPA userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        //System.out.println(user);
        userService.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) throws JsonProcessingException {
        User existingUser = userService.findByUsername(user.getUsername());
        boolean match = userService.checkiraj(user.getPassword(), existingUser);

        if (existingUser != null && match) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }
}
