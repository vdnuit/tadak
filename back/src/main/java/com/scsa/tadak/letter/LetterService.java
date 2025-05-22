package com.scsa.tadak.letter;

import com.scsa.tadak.user.SiteUser;
import com.scsa.tadak.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.scsa.tadak.receive.ReceiveService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LetterService {

    private final LetterRepository letterRepository;
    private final UserRepository userRepository;
	private final ReceiveService receiveService;

    public Letter createLetter(Long senderId, String title, String content) {
        SiteUser sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        Letter letter = Letter.builder()
                .sender(sender)
                .createdAt(LocalDateTime.now())
                .title(title)
                .content(content)
                .build();

        Letter savedLetter = letterRepository.save(letter);

        // Receive 트리거 동작: 편지 작성한 사람에게 랜덤 편지 할당
        receiveService.assignRandomLetterToUser(sender);
        
        return savedLetter;
    }
}
