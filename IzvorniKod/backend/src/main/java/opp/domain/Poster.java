package opp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;

@Entity
@Table(name = "Poster")
@Getter
@Setter
public class Poster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long posterId;

    private String nazivPoster;

    private String posterPath;

    private String emailAutor;

    private String imeAutor;

    private String prezimeAutor;


    private byte[] image;

    /*
    @Lob
    private Blob image;
     */

    @ManyToOne
    @JsonIgnore
    private Konferencija konferencija;
}
