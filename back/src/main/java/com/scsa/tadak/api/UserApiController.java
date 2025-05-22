package com.scsa.tadak.api;

import com.scsa.tadak.user.LoginRequest;
import com.scsa.tadak.user.SiteUser;
import com.scsa.tadak.user.SiteUserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserApiController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid UserCreateForm userCreateForm) {
        if (!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("비밀번호가 일치하지 않습니다.");
        }

        try {
            userService.create(
                userCreateForm.getUsername(),
                userCreateForm.getEmail(),
                userCreateForm.getPassword1()
            );
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("이미 등록된 사용자입니다.");
        }

        return ResponseEntity.ok("회원가입 성공");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal SiteUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인이 필요합니다.");
        }

        return ResponseEntity.ok(userDetails.getUsername());
    }

}