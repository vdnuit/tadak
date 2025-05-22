package com.scsa.tadak.receive;

import com.scsa.tadak.letter.Letter;
import com.scsa.tadak.letter.LetterRepository;
import com.scsa.tadak.user.SiteUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ReceiveService {

    private final ReceiveRepository receiveRepository;
    private final LetterRepository letterRepository;

    public void assignRandomLetterToUser(SiteUser receiver) {
        List<Letter> candidates = letterRepository.findAll();

        List<Letter> unassigned = candidates.stream()
                .filter(letter ->
                    !receiveRepository.existsByLetter(letter) &&
                    !letter.getSender().getId().equals(receiver.getId()) // 자신이 보낸 편지 제외
                )
                .toList();

        if (unassigned.isEmpty()) return;

        Letter randomLetter = unassigned.get(new Random().nextInt(unassigned.size()));

        Receive receive = Receive.builder()
                .letter(randomLetter)
                .receiver(receiver)
                .build();

        receiveRepository.save(receive);
    }

}
