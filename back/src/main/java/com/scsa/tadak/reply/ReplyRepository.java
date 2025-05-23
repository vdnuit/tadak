package com.scsa.tadak.reply;

import com.scsa.tadak.letter.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReplyRepository extends JpaRepository<Reply, Long> {

    Optional<Reply> findByLetter_LetterId(Long letterId);
    boolean existsByLetter_LetterId(Long letterId);

}
