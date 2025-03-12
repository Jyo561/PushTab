import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

const NotificationCard = () => {
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);
    } else {
      console.error("Notifications are not supported in this environment.");
    }
  };

  const sendNotification = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("New Notification!", {
            body: "You clicked the Send Notification button!",
            icon: "/icons/icon-192x192.png",
          });
        });
      } else {
        alert("Please allow notifications in your browser settings.");
  }
    } else {
      console.error("Notifications are not supported in this environment.");
    }
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <div className="w-full h-full bg-gradient-to-b from-[#392175] to-[#000000] pt-10 cardCustom flex-col justify-center text-center text-white shadow-lg">
          <h1 className="text-xl font-semibold ">Hola!</h1>
          <div className="relative flex items-center justify-center w-32 h-32 bell pt-50 pl-20">
            <div className="absolute w-51 h-51 rounded-full bg-[#4a269e] opacity-20 animate-ping"></div>
            <div className="absolute w-80 h-80 bg-radial from-[#1a0d38] tp-[#291557] rounded-full outline-none border border-[#422691]"></div>
            <div className="absolute w-60 h-60 bg-radial from-[#150b2e] to-[#1a0d38] rounded-full outline-none border border-[#703efa]"></div>
            <div className="absolute w-40 h-40 bg-radial from-[#4d2ca3] to-[#261652] outline-none border border-[#1b103b] rounded-full"></div>
            <Bell size={96} className="text-white text-4xl relative z-10" />
          </div>
          <div className="mt-12 flex flex-col items-center justify-center text-center bottom-10 fixed left-20 right-20">
            <p className="text-xl font-bold">Lorem ipsum...</p>
            <p className="text-md mt-2">Lorem ipsum dolor sit amet.</p>
            {permission === "granted" ? (
              <button
                onClick={sendNotification}
                className="mt-6 w-full px-4 py-2 rounded-lg border border-[#703efa] bg-[#4d2ca3] text-white hover:bg-white hover:text-[#4d2ca3] transition duration-200"
              >
                Send Notification
              </button>
            ) : (
              <button
                onClick={requestPermission}
                className="mt-6 w-full px-4 py-2 rounded-lg border border-[#703efa] bg-[#4d2ca3] text-white hover:bg-white hover:text-[#4d2ca3] transition"
              >
                Enable Notifications
              </button>
            )}
          </div>
        
          
      </div>
    </div>
  );
};

export default NotificationCard;

