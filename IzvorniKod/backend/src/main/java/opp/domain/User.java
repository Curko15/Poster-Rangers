package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Data
@Table(name = "user_table")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String username;
    private String password;





}
