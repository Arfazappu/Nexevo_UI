import { Route, Routes } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Menu from "./pages/Menu"
import Properties from "./pages/Properties"
import Tv from "./pages/Tv"
import Settings from "./pages/Settings"
import Cards from "./pages/Cards"
import Profile from "./pages/Profile"
import Users from "./pages/Users"

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default App