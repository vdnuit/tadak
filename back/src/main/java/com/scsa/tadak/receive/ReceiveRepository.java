package com.scsa.tadak.receive;

import com.scsa.tadak.letter.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiveRepository extends JpaRepository<Receive, Long> {

    boolean existsByLetter(Letter letter);

    // receiver_id 기준으로 Receive 레코드 조회 (→ Letter 정보 포함됨)
    List<Receive> findByReceiverId(Long receiverId);
}
