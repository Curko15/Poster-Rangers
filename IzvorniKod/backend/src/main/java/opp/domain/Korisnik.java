package opp.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Korisnik implements UserDetails {

    @Id
    @Column(unique = true)
    @NotNull
    @Email
    private String email;

    @Size(min=8)
    @NotNull
    private String password;
    @NotNull
    private String ime;
    @NotNull
    private String prezime;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "korisnik_roles",
    joinColumns = @JoinColumn(name = "email", referencedColumnName = "email"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = this.getRoles().stream()
                .map((role) -> new SimpleGrantedAuthority((role.getName()))).collect(Collectors.toSet());
        return authorities;
    }

    @Override
    public String getPassword() { return password; }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
