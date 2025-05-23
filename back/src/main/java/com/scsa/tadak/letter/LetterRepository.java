package com.scsa.tadak.letter;

import com.scsa.tadak.user.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LetterRepository extends JpaRepository<Letter, Long> {
    
    // sender_id 기준으로 조회
    List<Letter> findBySenderId(Long senderId);

    // 또는 연관관계로 되어 있다면:
    // List<Letter> findBySender(SiteUser sender);
}
