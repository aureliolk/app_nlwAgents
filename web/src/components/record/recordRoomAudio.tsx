import { Radio } from "lucide-react";
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
  const intervalRef = useRef<NodeJS.Timeout>(null)

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  async function stopRecording() {
    setIsRecording(false);

    if (record.current && record.current.state !== "inactive") {
      record.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio/webm");

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: "POST",
        body: formData,
      },
    );

    const result = await response.json();

    console.log(result);
  }

  function createRecord(audio: MediaStream) {
    record.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    record.current.ondataavailable = (event) => {
      uploadAudio(event.data);
    };

    record.current.onstart = () => {
      console.log("Gravação Iniciada");
    };

    record.current.onstop = () => {
      console.log("Gravação Encerrada");
    };

    record.current.start();
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

    createRecord(audio)


    intervalRef.current = setInterval(() => {
      record.current?.stop()
      createRecord(audio)
    }, 5000)
  }

  return (
    <div className="">
      {isRecording ? (
        <Button
          onClick={stopRecording}
          className="flex items-center gap-2"
          variant="secondary"
        >
          Parar Audio
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          className="flex items-center gap-2"
          variant="secondary"
        >
          <Radio className="size-4" />
          Gravar Audio
        </Button>
      )}
    </div>
  );
}
