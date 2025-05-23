package com.scsa.tadak.reply;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyRequest {
    private Long letterId;
    private String content;
}
