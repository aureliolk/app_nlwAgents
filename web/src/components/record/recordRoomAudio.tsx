import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { RoomParams } from "@/pages/room";
import { Button } from "../ui/button";

const isRecordingSuport =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function RecordingAudio() {
  const params = useParams<RoomParams>();
  const [isRecording, setIsRecording] = useState(false);
  const record = useRef<MediaRecorder | null>(null);

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  async function stopRecording() {
    setIsRecording(true);

    if (record.current && record.current.state !== "inactive") {
      record.current.stop();
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio/webm");

    const response = await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData
    });

    const result = await response.json()

    console.log(result)
  }

  async function startRecording() {
    if (!isRecordingSuport) {
      alert("No surpote para gravação");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    record.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    record.current.ondataavailable = (event) => {
      uploadAudio(event.data)
    };

    record.current.onstart = () => {
      console.log("Gravação Iniciada");
    };

    record.current.onstop = () => {
      console.log("Gravação Encerrada");
    };

    record.current.start();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar Audio</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Audio</Button>
      )}
    </div>
  );
}
