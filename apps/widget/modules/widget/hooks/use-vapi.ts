import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTranscript, setIsTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    // ONLY FOR TESTING THE VAPI API, otherwise customers will provide their own API keys
    const vapiInstance = new Vapi("677dab39-6b7e-43f7-aa8e-4df08f7b7b69");

    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setIsTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.error(error, "Vapi Error");
      setIsConnecting(false);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setIsTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    setIsConnecting(true);
    if (vapi) {
      // ONLY FOR TESTING THE VAPI API, otherwise customers will provide their own Assistant Id's
      vapi.start("ac6dbbe6-da77-4241-b09d-98e3de4658df");
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isSpeaking,
    isConnected,
    isConnecting,
    isTranscript,
    startCall,
    endCall,
  };
};
