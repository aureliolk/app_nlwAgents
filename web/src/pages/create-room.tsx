import { Link } from "react-router-dom";

export function CreateRoom() {
	return (
		<div>
			<h1>Create Room</h1>
			<Link to={"/room"} className="underline">
				Clique Aqui
			</Link>
		</div>
	);
}
