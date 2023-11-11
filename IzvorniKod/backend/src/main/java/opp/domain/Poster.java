package opp.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "Poster")
public class Poster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long posterId;

    private String nazivPoster;

    private String posterPath;

    private String emailAutor;

    private String imeAutor;

    private String prezimeAutor;

    @ManyToOne
    private Konferencija konferencija;
}
