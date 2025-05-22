package com.scsa.tadak.letter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    @PostMapping
    public Letter createLetter(@RequestBody LetterRequest request) {
        return letterService.createLetter(
                request.getSenderId(),
                request.getTitle(),
                request.getContent()
        );
    }
}
