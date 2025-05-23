package com.scsa.tadak.letter;

import com.scsa.tadak.receive.Receive;
import com.scsa.tadak.receive.ReceiveRepository;
import com.scsa.tadak.receive.ReceiveService;
import com.scsa.tadak.user.SiteUser;
import com.scsa.tadak.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LetterService {

    private final LetterRepository letterRepository;
    private final UserRepository userRepository;
    private final ReceiveService receiveService;
    private final ReceiveRepository receiveRepository;

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

        // 편지 작성 후 랜덤 편지 수신 트리거
        receiveService.assignRandomLetterToUser(sender);

        return savedLetter;
    }

    // 🔹 보낸 편지 목록 조회
    public List<LetterDto> getLettersSentBy(Long senderId) {
        return letterRepository.findBySenderId(senderId).stream()
                .map(letter -> new LetterDto(
                        letter.getLetterId(),
                        letter.getTitle(),
                        letter.getSender().getUsername(),
                        letter.getCreatedAt()       // ✅ 작성일시 포함

                ))
                .collect(Collectors.toList());
    }

    // 🔹 받은 편지 목록 조회
    public List<LetterDto> getLettersReceivedBy(Long receiverId) {
        return receiveRepository.findByReceiverId(receiverId).stream()
                .map(receive -> {
                    Letter letter = receive.getLetter();
                    return new LetterDto(
                            letter.getLetterId(),
                            letter.getTitle(),
                            letter.getSender().getUsername(),
                            letter.getCreatedAt()       // ✅ 작성일시 포함

                    );
                })
                .collect(Collectors.toList());
    }
}
