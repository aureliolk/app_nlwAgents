import { ArrowRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";

export function RoomList() {
	const { data, isLoading } = useRooms();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas Recentes</CardTitle>
				<CardDescription>
					Acesso rápido para as salas criadas recentemente
				</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<LoaderCircle />
				) : (
					<div className="flex flex-col gap-3">
						{data?.map((room) => {
							return (
								<Link
									className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
									key={room.id}
									to={`/room/${room.id}`}
								>
									<div className="flex flex-col gap-2">
										<h3 className="font-medium">{room.name}</h3>
										<div className="flex gap-4">
											<Badge className="text-[10px]" variant={"secondary"}>
												{dayjs(room.createdAt).toNow()}
											</Badge>
											<Badge className="text-[10px]" variant={"outline"}>
												{room.questionsCount} pergunsta
												{room.questionsCount > 1 ? "s" : ""}
											</Badge>
										</div>
									</div>

									<div className="flex items-center gap-2 text-xs">
										Entrar
										<ArrowRight size={15} />
									</div>
								</Link>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
