import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<CreateRoom />} />
				<Route element={<Room />} path="/room" />
				<Route path="*" element={<h1>404 Not Found</h1>} />
			</Routes>
		</BrowserRouter>
	);
}
