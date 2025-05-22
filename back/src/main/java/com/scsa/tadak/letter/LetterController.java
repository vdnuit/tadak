package com.scsa.tadak.letter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.scsa.tadak.user.SiteUserDetails;
import com.scsa.tadak.user.SiteUser;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    @PostMapping
    public Letter createLetter(@AuthenticationPrincipal SiteUserDetails userDetails,
                               @RequestBody LetterRequest request) {
        SiteUser sender = userDetails.getSiteUser(); // 이렇게 바로 꺼냄

        return letterService.createLetter(sender.getId(), request.getTitle(), request.getContent());
    }

}
