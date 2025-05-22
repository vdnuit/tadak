package com.scsa.tadak.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.OneToMany;
import java.util.List;
import java.util.ArrayList;
import com.scsa.tadak.letter.Letter;

@Getter
@Setter
@Entity
public class SiteUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    @Column(unique = true)
    private String email;
    
    @OneToMany(mappedBy = "sender")
    private List<Letter> letters = new ArrayList<>();

}
