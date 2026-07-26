// src/components/JitsiMeet.jsx
import { useEffect, useRef } from "react";

export default function JitsiMeet({ aulaId, userName, onClose }) {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: `enaula-aula-${aulaId}`, // sala única por aula
      width: "100%",
      height: 500,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: userName,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        prejoinPageEnabled: false, // pula a tela de espera
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone", "camera", "closedcaptions",
          "desktop", "fullscreen", "fodeviceselection",
          "hangup", "chat", "settings", "raisehand",
          "videoquality", "tileview",
        ],
      },
    };

    apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    // Evento: quando o usuário sai da chamada
    apiRef.current.addEventListeners({
      readyToClose: () => {
        if (onClose) onClose();
      },
    });

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, [aulaId, userName]);

  return (
    <div
      ref={jitsiContainerRef}
      style={{ width: "100%", height: "500px", borderRadius: "8px", overflow: "hidden" }}
    />
  );
}