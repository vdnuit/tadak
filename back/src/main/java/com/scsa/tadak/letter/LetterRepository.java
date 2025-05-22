package com.scsa.tadak.letter;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {
    // 기본적인 CRUD는 자동 제공됨
}
