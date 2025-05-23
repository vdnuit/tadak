package com.scsa.tadak.letter;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class LetterDto {
    private Long id;
    private String title;
    private String sender;         // 작성자 username
    private LocalDateTime createdAt; // 작성일시
}
