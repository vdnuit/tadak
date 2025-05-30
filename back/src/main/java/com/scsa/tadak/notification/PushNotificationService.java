package com.scsa.tadak.notification;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.scsa.tadak.user.SiteUser;
import lombok.RequiredArgsConstructor;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Utils;
import org.apache.http.HttpResponse;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Security;
import java.util.List;

import lombok.Data;
import lombok.AllArgsConstructor;

@Service
@RequiredArgsConstructor
public class PushNotificationService {

    private final PushSubscriptionRepository subscriptionRepository;
    private final ObjectMapper objectMapper;

    @Value("${push.vapid.public-key}")
    private String publicKey;

    @Value("${push.vapid.private-key}")
    private String privateKey;

    @Value("${push.vapid.subject}")
    private String subject;

    public void sendReplyNotification(SiteUser receiver, String letterTitle) {
        System.out.println("[푸시 전송 시작] 대상: " + receiver.getUsername());

        List<PushSubscription> subscriptions = subscriptionRepository.findByUser(receiver);
        System.out.println("[푸시 구독 수] " + subscriptions.size());

        if (subscriptions.isEmpty()) {
            System.out.println("[푸시 중단] 구독 없음");
            return;
        }

        try {
            Security.addProvider(new BouncyCastleProvider());
            System.out.println("[푸시] BouncyCastleProvider 등록 완료");

            PushService pushService = new PushService();
            pushService.setPublicKey(Utils.loadPublicKey(publicKey));
            pushService.setPrivateKey(Utils.loadPrivateKey(privateKey));
            pushService.setSubject(subject);
            System.out.println("[푸시] 키 설정 완료");

            String payload = objectMapper.writeValueAsString(
                new NotificationMessage(
                    "타닥",
                    receiver.getUsername() + "님이 쓴 [" + letterTitle + "]에 답장이 도착했어요!",
                    "/mypage"
                )
            );
            System.out.println("[푸시] Payload 생성 완료: " + payload);

            for (PushSubscription s : subscriptions) {
                Notification notification = new Notification(
                    s.getEndpoint(),
                    s.getP256dh(),
                    s.getAuth(),
                    payload
                );
                System.out.println("[푸시] Notification 객체 생성 완료");

                HttpResponse response = pushService.send(notification);
                System.out.println("[푸시 응답 코드] " + response.getStatusLine().getStatusCode());
            }
        } catch (Exception e) {
            System.out.println("[푸시 전송 중 예외] " + e.getMessage());
            e.printStackTrace();
        }
    }


    @Data
    @AllArgsConstructor
    private static class NotificationMessage {
        private String title;
        private String body;
        private String url;
    }
}
