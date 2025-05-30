package com.scsa.tadak.notification;

import lombok.Data;

import java.util.Map;

@Data
public class PushSubscriptionRequest {
    private String endpoint;
    private Map<String, String> keys;
}
