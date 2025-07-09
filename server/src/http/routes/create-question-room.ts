import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../db/conection.ts";
import { schema } from "../../db/schema/index.ts";

export const createQuestionsRoom: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/rooms/:roomId/questions",
		{
			schema: {
				params: z.object({
					roomId: z.string(),
				}),
				body: z.object({
					question: z.string().min(1),
				}),
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;
			const { question } = request.body;

			const res = await db
				.insert(schema.questions)
				.values({
					roomId,
					question,
				})
				.returning();

			const insertedRoom = res[0].id;

			if (!insertedRoom) {
				throw new Error("Failed to create new room");
			}

			return reply.status(201).send({
				roomId: insertedRoom,
			});
		},
	);
};
