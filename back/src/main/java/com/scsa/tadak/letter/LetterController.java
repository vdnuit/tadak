package com.scsa.tadak.letter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.scsa.tadak.user.SiteUserDetails;
import com.scsa.tadak.user.SiteUser;

import java.util.List;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    // 편지 작성
    @PostMapping
    public Letter createLetter(@AuthenticationPrincipal SiteUserDetails userDetails,
                                @RequestBody LetterRequest request) {
        SiteUser sender = userDetails.getSiteUser();
        return letterService.createLetter(sender.getId(), request.getTitle(), request.getContent());
    }

    // 받은 편지 조회
    @GetMapping("/received")
    public List<LetterDto> getMyReceivedLetters(@AuthenticationPrincipal SiteUserDetails userDetails) {
        SiteUser user = userDetails.getSiteUser();
        return letterService.getLettersReceivedBy(user.getId());
    }

    // 보낸 편지 조회
    @GetMapping("/sent")
    public List<LetterDto> getMySentLetters(@AuthenticationPrincipal SiteUserDetails userDetails) {
        SiteUser user = userDetails.getSiteUser();
        return letterService.getLettersSentBy(user.getId());
    }
}
