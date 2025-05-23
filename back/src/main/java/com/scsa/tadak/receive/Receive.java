package com.scsa.tadak.receive;

import com.scsa.tadak.letter.Letter;
import com.scsa.tadak.user.SiteUser;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long receiveId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false, unique = true)
    private Letter letter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id", nullable = false)
    private SiteUser receiver;
}

