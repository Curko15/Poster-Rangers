package opp.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurtiyConfiguration {
    private static final String[] WHITE_LIST_URL = {
            "/korisnici/registerPP",
            "/korisnici/authenticatePP",
            "/korisnici/reset-password",
            "/korisnici/reset-password1",
            "/korisnici/password-reset-request",
            "/konferencija/loginKonf",
            "/korisnici/registerAdmin",
            "/konferencija/getKonfId",
            "/poster/getAll/**",
            "/poster/**",
            "glasanje/**",
            "glasanje/*",
            "glasanje/addGlas",
            "/images/**",
            "/static/images/**",
            "/api/images/**",
            "/static/**",
            "/resources/**"
    };


    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.setAllowCredentials(true);
                    corsConfig.addAllowedOriginPattern("https://poster-rangers-fe.onrender.com");
                    corsConfig.addAllowedOriginPattern("http://localhost:3000/");
                    corsConfig.addAllowedHeader("Authorization");
                    corsConfig.addAllowedHeader("Content-Type");
                    corsConfig.addAllowedMethod(HttpMethod.GET);
                    corsConfig.addAllowedMethod(HttpMethod.POST);

                    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                    source.registerCorsConfiguration("/**", corsConfig);
                    cors.configurationSource(source);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((authorize) -> authorize.requestMatchers(WHITE_LIST_URL).permitAll().anyRequest().authenticated())
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

}