self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "New notification!";
  
  event.waitUntil(
    self.registration.showNotification("Notification", {
      body: data,
      icon: "/icons/icon-192x192.png",
    })
  );
});
