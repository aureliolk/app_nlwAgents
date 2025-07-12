import { RoomCreate } from "@/components/room/create-room-form";
import { RoomList } from "@/components/room/room-list";

export function CreateRoom() {
	return (
		<div className="min-h-screen p-4">
			<div className="mx-auto max-w-4xl">
				<div className="grid grid-cols-2 items-start gap-8">
					<RoomCreate />
					<RoomList />
				</div>
			</div>
		</div>
	);
}
