import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";

export function App() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<CreateRoom />} />
					<Route path="/room/:id" element={<Room />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
