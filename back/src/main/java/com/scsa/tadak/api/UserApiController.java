package com.scsa.tadak.api;
import com.scsa.tadak.user.LoginRequest;

import com.scsa.tadak.user.UserCreateForm;
import com.scsa.tadak.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.scsa.tadak.common.ErrorResponse;
import java.time.LocalDateTime;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserApiController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid UserCreateForm userCreateForm) {

        // 수동 검증: 비밀번호 일치 확인
        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
        	return ResponseEntity
        		    .status(HttpStatus.BAD_REQUEST)
        		    .body(ErrorResponse.builder()
        		        .status(HttpStatus.BAD_REQUEST.value())
        		        .message("비밀번호가 일치하지 않습니다.")
        		        .timestamp(LocalDateTime.now())
        		        .path("/api/user/signup")
        		        .build());

        }

        try {
            userService.create(
                    userCreateForm.getUsername(),
                    userCreateForm.getEmail(),
                    userCreateForm.getPassword1()
            );
        } catch (DataIntegrityViolationException e) {
        	return ResponseEntity.status(HttpStatus.CONFLICT)
        		    .body(ErrorResponse.builder()
        		        .status(HttpStatus.CONFLICT.value())
        		        .message("이미 등록된 사용자입니다.")
        		        .timestamp(LocalDateTime.now())
        		        .path("/api/user/signup")
        		        .build());
        } catch (Exception e) {
        	return ResponseEntity
        		    .status(HttpStatus.INTERNAL_SERVER_ERROR)
        		    .body(ErrorResponse.builder()
        		        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
        		        .message("회원가입 처리 중 오류가 발생했습니다: " + e.getMessage())
        		        .timestamp(LocalDateTime.now())
        		        .path("/api/user/signup")
        		        .build());
}

        return ResponseEntity.ok("회원가입 성공");
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 로그인 검증 로직 (아이디/비밀번호 확인 등)
        boolean success = userService.verify(request.getUsername(), request.getPassword());

        if (success) {
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.builder()
                    .status(HttpStatus.UNAUTHORIZED.value())
                    .message("아이디 또는 비밀번호가 올바르지 않습니다.")
                    .timestamp(LocalDateTime.now())
                    .path("/api/user/login")
                    .build());
        }
    }

}
