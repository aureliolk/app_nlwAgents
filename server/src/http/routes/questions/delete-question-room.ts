import { and, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { db } from "../../../db/conection.ts";
import { schema } from "../../../db/schema/index.ts";

export const deleteQuestionRoom: FastifyPluginCallbackZod = (app) => {
  app.delete(
    "/rooms/:roomId/questions/:questionId",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
          questionId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { questionId, roomId } = request.params;

      console.log("questionId type:", typeof questionId, "value:", questionId);


      const res = await db
        .delete(schema.questions)
        .where(and(eq(schema.questions.id, questionId), eq(schema.questions.roomId, roomId)))
        .returning();

      const deletedQuestion = res[0];

      if (!deletedQuestion) {
        // If no question was deleted, it means the questionId didn't match any existing question
        return reply.status(404).send({ message: "Question not found." });
      }

      return reply.status(204).send(); // 204 No Content for successful deletion
    },
  );
};
