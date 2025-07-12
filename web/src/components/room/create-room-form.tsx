import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useCreateRoom } from "@/http/use-create-room";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const creatRoomSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Nome da Sala precisa ter pelo menos 3 letras!" }),
	description: z.string(),
});

type CreateRoomFormData = z.infer<typeof creatRoomSchema>;

export function RoomCreate() {
	const createRoomForm = useForm<CreateRoomFormData>({
		resolver: zodResolver(creatRoomSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { mutateAsync: CreateRoom } = useCreateRoom();

	async function HandleCreateRoom({ name, description }: CreateRoomFormData) {
		await CreateRoom({
			name,
			description,
		});
		createRoomForm.reset();
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Cria Sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber respostas
					da I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...createRoomForm}>
					<form onSubmit={createRoomForm.handleSubmit(HandleCreateRoom)}>
						<FormField
							control={createRoomForm.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Nome da Sala</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="Digite o nome da sala com ate 3 letras!"
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<FormField
							control={createRoomForm.control}
							name="description"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Descrição</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												placeholder="Fale um pouco de sua sala!"
											/>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<Button type="submit" className="w-full">
							Cria Sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
