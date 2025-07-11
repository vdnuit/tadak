package com.scsa.tadak.letter;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LetterDto {
    private Long id;
    private String title;
    private String content;
    private String sender;     // username
    private Long senderId;     // <- 추가
    private LocalDateTime createdAt;
}
