import { BrowserRouter, Routes, Route } from "react-router-dom";

import GenerateBarcodes from "./pages/GenerateBarcodes";
import MyMusic from "./pages/MyMusic";
import Login from "./pages/Login";
import AdminUpload from "./pages/AdminUpload";
import AdminRoute from "./components/AdminRoute";
import Activate from "./pages/Activate";
import AdminDashboard from "./pages/AdminHome";
import AdminMusic from "./pages/AdminMusic";



function App() {

  return (

   <BrowserRouter>
  <Routes>

    {/* Public 
    <Route path="/" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/player/:id" element={<Player />} />
*/}

    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Login />} />
    
    {/* Customer */}
    <Route path="/activate/:code" element={<Activate />} />
    <Route path="/my-music" element={<MyMusic />} />

    {/* Admin */}
    <Route
      path="/admin"
      element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      }
    />

    <Route
      path="/admin/upload"
      element={
        <AdminRoute>
          <AdminUpload />
        </AdminRoute>
      }
    />
   <Route
      path="/admin/music"
      element={
        <AdminRoute>
          <AdminMusic />
        </AdminRoute>
      }
    />
    <Route 
      path="/generate-barcodes"
      element={
        <AdminRoute>
          <GenerateBarcodes />
        </AdminRoute>
      }
    />

  </Routes>
</BrowserRouter>
  );

}


export default App;