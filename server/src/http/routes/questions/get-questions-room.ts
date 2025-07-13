import { desc, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../../db/conection.ts";
import { schema } from "../../../db/schema/index.ts";

export const getRoomQuestionsRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/rooms/:roomId/questions",
		{
			schema: {
				params: z.object({
					roomId: z.string(),
				}),
			},
		},
		async (request) => {
			const { roomId } = request.params;

			const result = await db
				.select()
				.from(schema.questions)
				.where(eq(schema.questions.roomId, roomId))
				.orderBy(desc(schema.questions.createdAt));

			return result;
		},
	);
};
