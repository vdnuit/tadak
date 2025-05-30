package com.scsa.tadak.reply;

import com.scsa.tadak.letter.Letter;
import com.scsa.tadak.letter.LetterRepository;
import com.scsa.tadak.notification.PushNotificationService;  // ✅ 추가
import com.scsa.tadak.user.SiteUser;
import com.scsa.tadak.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final LetterRepository letterRepository;
    private final UserRepository userRepository;
    private final PushNotificationService pushNotificationService;  // ✅ 추가

    public ReplyDto writeReply(Long letterId, Long replierId, String content) {
        Letter letter = letterRepository.findById(letterId)
                .orElseThrow(() -> new IllegalArgumentException("편지를 찾을 수 없습니다."));

        SiteUser replier = userRepository.findById(replierId)
                .orElseThrow(() -> new IllegalArgumentException("작성자를 찾을 수 없습니다."));

        if (replyRepository.existsByLetter_LetterId(letterId)) {
            throw new IllegalStateException("이미 이 편지에는 답장이 존재합니다.");
        }

        Reply reply = Reply.builder()
                .letter(letter)
                .replier(replier)
                .content(content)
                .createdAt(LocalDateTime.now())
                .build();

        Reply saved = replyRepository.save(reply);

        // ✅ 푸시 알림 발송
        SiteUser originalSender = letter.getSender();
        pushNotificationService.sendReplyNotification(originalSender, letter.getTitle());

        return new ReplyDto(saved.getReplyId(), saved.getContent(), saved.getReplier().getUsername(), saved.getCreatedAt());
    }

    public ReplyDto getReplyByLetterId(Long letterId) {
        Letter letter = letterRepository.findById(letterId)
                .orElseThrow(() -> new IllegalArgumentException("편지를 찾을 수 없습니다."));

        Reply reply = replyRepository.findByLetter_LetterId(letterId)
                .orElseThrow(() -> new IllegalArgumentException("답장이 존재하지 않습니다."));

        return new ReplyDto(reply.getReplyId(), reply.getContent(), reply.getReplier().getUsername(), reply.getCreatedAt());
    }
}
