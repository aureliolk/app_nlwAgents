import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsApiResponse = Array<{
	id: string;
	name: string;
}>;

export function CreateRoom() {
	const { data, isLoading } = useQuery({
		queryKey: ["getRooms"],
		queryFn: async () => {
			const res = await fetch("http://localhost:3333/rooms");
			const result: GetRoomsApiResponse = await res.json();
			return result;
		},
	});

	return (
		<div>
			<h1>Create Room</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div>
					<ul>
						{data?.map((room) => (
							<li key={room.id}>
								<Link to={`/room/${room.id}`}>{room.name}</Link>
							</li>
						))}
					</ul>
				</div>
			)}

			<Link to={"/room"} className="underline">
				Clique Aqui
			</Link>
		</div>
	);
}
