package com.scsa.tadak.letter;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LetterRequest {
    private Long senderId;  // 타입을 Long으로 변경
    private String title;
    private String content;
}

