/* eslint-disable no-restricted-globals */
/* global self, clients */

self.addEventListener("push", function (event) {
  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "새로운 알림이 도착했어요!";
  const options = {
    body: data.body || "내용을 확인해보세요.",
    icon: "/logo192.png",
    badge: "/badge.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";
  
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
