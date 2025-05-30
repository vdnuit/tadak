package com.scsa.tadak.notification;

import com.scsa.tadak.user.SiteUser;
import com.scsa.tadak.user.SiteUserDetails;
import com.scsa.tadak.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PushNotificationController {

    private final PushSubscriptionRepository pushSubscriptionRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<Void> subscribe(@RequestBody PushSubscriptionRequest request,
                                          @AuthenticationPrincipal SiteUserDetails userDetails) {
        if (userDetails == null) {
            System.out.println("[푸시 구독 실패] 인증 정보 없음");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        SiteUser user = userDetails.getSiteUser();

        // 기존 구독 정보 삭제
        pushSubscriptionRepository.deleteByUser(user);

        PushSubscription subscription = PushSubscription.builder()
                .endpoint(request.getEndpoint())
                .p256dh(request.getKeys().get("p256dh"))
                .auth(request.getKeys().get("auth"))
                .user(user)
                .build();

        pushSubscriptionRepository.save(subscription);

        System.out.println("[푸시 구독 완료] " + user.getUsername());
        return ResponseEntity.ok().build();
    }
}
