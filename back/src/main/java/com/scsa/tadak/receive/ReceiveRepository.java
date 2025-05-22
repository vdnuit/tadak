package com.scsa.tadak.receive;
import com.scsa.tadak.letter.Letter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiveRepository extends JpaRepository<Receive, Long> {
    boolean existsByLetter(Letter letter);
}
