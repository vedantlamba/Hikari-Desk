"use client";
import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const {
    isSpeaking,
    isConnected,
    isConnecting,
    isTranscript,
    startCall,
    endCall,
  } = useVapi();
  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-fll">
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button onClick={() => endCall()} variant="destructive">
        End Call
      </Button>
      <p>IsConnected: {`${isConnected}`}</p>
      <p>IsConnecting: {`${isConnecting}`}</p>
      <p>IsSpeaking: {`${isSpeaking}`}</p>
      <p>{JSON.stringify(isTranscript, null, 2)}</p>
    </div>
  );
}
