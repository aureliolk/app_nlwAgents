import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import "./db/conection.ts";
import { createQuestionsRoom } from "./http/routes/create-question-room.ts";
import { createRoomRoute } from "./http/routes/create-rooms.ts";
import { getRoomQuestionsRoute } from "./http/routes/get-room-questions.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const ports = env.PORT;
const serverUrl = env.SERVER_URL;

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: [serverUrl, "http://localhost:5173"],
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return { status: "ok" };
});

app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomQuestionsRoute);
app.register(createQuestionsRoom);

app.listen({ port: Number(ports) }).then(() => {
	console.log(`Server is running on ${serverUrl}:${ports}`);
});
