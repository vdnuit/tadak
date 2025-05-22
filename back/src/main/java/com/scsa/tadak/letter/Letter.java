package com.scsa.tadak.letter;

import com.scsa.tadak.user.SiteUser;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Letter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long letterId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private SiteUser sender;

    private LocalDateTime createdAt;

    @Column(nullable = false, length = 20)
    private String title;

    @Column(nullable = false, length = 1000)
    private String content;
}
