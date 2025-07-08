import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env.ts";
import "./db/conection.ts";
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const ports = env.PORT;
const serverUrl = env.SERVER_URL;

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
	origin: serverUrl,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
	return { status: "ok" };
});

app.register(getRoomsRoute);

app.listen({ port: Number(ports) }).then(() => {
	console.log(`Server is running on ${serverUrl}:${ports}`);
});
