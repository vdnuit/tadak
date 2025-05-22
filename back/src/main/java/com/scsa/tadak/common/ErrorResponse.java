package com.scsa.tadak.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponse {
    private final int status;
    private final String message;
    private final LocalDateTime timestamp;
    private final String path; // 요청 경로 (선택)
}
