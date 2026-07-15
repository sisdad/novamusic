import { Link } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaQrcode,
  FaMusic,
  FaSignOutAlt,
  FaCompactDisc,
} from "react-icons/fa";

import "../styles/AdminHome.css";

export default function AdminHome() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="admin-home">

      <div className="dashboard-card">

        <div className="dashboard-header">

          <div>
            <h1>
              <FaCompactDisc /> Nova Music
            </h1>

            <p>
              Welcome back {user?.name || "Administrator"}
            </p>
          </div>

          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        <div className="dashboard-grid">

          <Link to="/admin/upload" className="dashboard-item">
            <FaCloudUploadAlt />
            <h3>Upload Music</h3>
            <p>Add new songs to your music library.</p>
          </Link>

          <Link to="/generate-barcodes" className="dashboard-item">
            <FaQrcode />
            <h3>Generate QR Codes</h3>
            <p>Create activation QR codes for customers.</p>
          </Link>

          <Link to="/admin/music" className="dashboard-item">
            <FaMusic />
            <h3>My Music</h3>
            <p>Preview and manage uploaded songs.</p>
          </Link>

        </div>

      </div>

    </div>
  );
}