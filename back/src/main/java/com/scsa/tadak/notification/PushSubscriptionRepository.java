package com.scsa.tadak.notification;

import com.scsa.tadak.user.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface PushSubscriptionRepository extends JpaRepository<PushSubscription, Long> {
    List<PushSubscription> findByUser(SiteUser user);

    @Transactional
    void deleteByUser(SiteUser user);
}
