package opp.service.impl;

import opp.dao.UserRepo;
import opp.domain.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJPA {
    private final UserRepo userRepository;
    private final BCryptPasswordEncoder passwordEncoder;


    public UserServiceJPA(UserRepo userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean checkiraj(String kralj, User netko){
        return passwordEncoder.matches(kralj, netko.getPassword());
    }

    public User save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}