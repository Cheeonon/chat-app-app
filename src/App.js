import "./styles/App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FriendsListPage from "./pages/FriendsListPage/FriendsListPage";
import RoomListPage from "./pages/RoomListPage/RoomListPage";
import ChatRoomPage from "./pages/ChatRoomPage/ChatRoomPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

function App() {


    return (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/friends" element={<FriendsListPage />} />
              <Route path="/rooms" element={<RoomListPage />} />
              <Route path="/chat-room" element={<ChatRoomPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </>
    );
}

export default App;
