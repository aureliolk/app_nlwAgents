import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRoomRequest } from "./types/create-question-room-request";
import type { GetRoomQuestionResponse } from "./types/get-room-question-response";
import type { CreateQuestionRoomResponse, DeleteQuestionResponse } from "./types/questions";

export function getQuestionRoom(roomId: string) {
	return useQuery({
		queryKey: ["getQuestionRoom", roomId],
		queryFn: async () => {
			const res = await fetch(
				`http://localhost:3333/rooms/${roomId}/questions`,
			);
			const result: GetRoomQuestionResponse = await res.json();
			return result;
		},
	});
}

export function useCreateQuestionRoom(roomId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateQuestionRoomRequest) => {
			const res = await fetch(
				`http://localhost:3333/rooms/${roomId}/questions`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);

			const result: CreateQuestionRoomResponse = await res.json();

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getQuestionRoom", roomId] });
		},
	});
}

export function useDeleteQuestionRoom(roomId: string, questionId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const res = await fetch(
				`http://localhost:3333/rooms/${roomId}/questions/${questionId}`,
				{
					method: "DELETE",
				}
			);

			if (res.status === 204) {
				return; // No content to parse
			}

			const result: DeleteQuestionResponse = await res.json();

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["getQuestionRoom", roomId] });
		},
	});
}
