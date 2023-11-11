package opp.domain;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;

@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
