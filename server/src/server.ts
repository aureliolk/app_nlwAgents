import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart"
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import "./db/conection.ts";
import { createRoomRoute } from "./http/routes/create-rooms.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";
import { createQuestionsRoom } from "./http/routes/questions/create-question-room.ts";
import { deleteQuestionRoom } from "./http/routes/questions/delete-question-room.ts";
import { getRoomQuestionsRoute } from "./http/routes/questions/get-questions-room.ts";
import { uploadAudio } from "./http/routes/upload/upload-audio.ts";

const ports = env.PORT;
const serverUrl = env.SERVER_URL;

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: [serverUrl, "http://localhost:5173"],
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return { status: "ok" };
});

app.register(fastifyMultipart)
app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionsRoom);
app.register(deleteQuestionRoom);
app.register(uploadAudio)


app.listen({ port: Number(ports) }).then(() => {
	console.log(`Server is running on ${serverUrl}:${ports}`);
});
