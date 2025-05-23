package com.scsa.tadak.reply;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ReplyDto {
    private Long id;
    private String content;
    private String replier;
    private LocalDateTime createdAt;
}
