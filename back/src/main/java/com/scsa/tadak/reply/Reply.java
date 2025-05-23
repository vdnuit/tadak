package com.scsa.tadak.reply;

import com.scsa.tadak.letter.Letter;
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
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false, unique = true)
    private Letter letter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "replier_id", nullable = false)
    private SiteUser replier;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, length = 1000)
    private String content;
}
