import { useState } from "react";
import api from "../services/api";
import "../styles/AdminUpload.css";
import AdminNavbar from "../components/AdminNavbar";
export default function AdminUpload() {
  const [form, setForm] = useState({
    title: "",
    artist: "",
  });

  const [music, setMusic] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);

  function changeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function uploadMusic(e) {
  e.preventDefault();

  if (!music) {
    alert("Please select a music file.");
    return;
  }

  setLoading(true);

  try {
    const data = new FormData();

    data.append("title", form.title);
    data.append("artist", form.artist);
    data.append("music", music);

    if (cover) {
      data.append("cover", cover);
    }


    console.log("Uploading...");


    const res = await api.post(
      "/music/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    console.log("Upload response:", res.data);

    alert(res.data.message);


    setForm({
      title: "",
      artist: "",
    });

    setMusic(null);
    setCover(null);


    document.getElementById("musicFile").value = "";
    document.getElementById("coverFile").value = "";


  } catch (err) {

    console.log("UPLOAD ERROR:", err);

    alert(
      err.response?.data?.message ||
      "Upload failed"
    );


  } finally {

    // This always executes
    setLoading(false);

  }
}

  return (
    <>
    
    <AdminNavbar/>
    
    <div className="upload-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            <div className="upload-card">
              <div className="card-body p-5">

                <div className="upload-header">
                  <h2>🎵 Upload New Music</h2>
                  
                </div>

                <form onSubmit={uploadMusic}>

                  <div className="row">

                    <div className="col-md-6 mb-4">
                      <label className="form-label">
                        Music Title
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        placeholder="Enter music title"
                        value={form.title}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label className="form-label">
                        Artist
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="artist"
                        placeholder="Artist name"
                        value={form.artist}
                        onChange={changeHandler}
                        required
                      />
                    </div>

                  </div>

                 
                  <div className="upload-box mb-4">

                    <h5 className="mb-3">
                      🎧 Music File
                    </h5>

                    <input
                      id="musicFile"
                      type="file"
                      className="form-control"
                      accept="audio/*"
                      required
                      onChange={(e) => setMusic(e.target.files[0])}
                    />

                    {music && (
                      <span className="file-name">
                        ✅ {music.name}
                      </span>
                    )}

                  </div>

                  <div className="upload-box mb-4">

                    <h5 className="mb-3">
                      🖼 Cover Image
                    </h5>

                    <input
                      id="coverFile"
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) => setCover(e.target.files[0])}
                    />

                    {cover && (
                      <span className="file-name">
                        ✅ {cover.name}
                      </span>
                    )}

                  </div>

                  <button
                    type="submit"
                    className="upload-btn"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "🚀 Upload Music"}
                  </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}