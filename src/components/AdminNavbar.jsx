import { NavLink, useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";


export default function AdminNavbar(){


    const navigate = useNavigate();



    const logout = ()=>{


        localStorage.clear();

        navigate("/login");


    };



    return (

<nav className="admin-navbar">


<div className="navbar-brand">

<div className="music-logo">

🎵

</div>


<div>

<h2>
Music Studio
</h2>

<span>
Admin Panel
</span>

</div>


</div>






<div className="navbar-menu">


<NavLink

to="/admin/upload"

className={({isActive})=>
isActive ? "active" : ""
}

>

🎶 Upload

</NavLink>





<NavLink

to="/generate-barcodes"

className={({isActive})=>
isActive ? "active" : ""
}

>

▣ Generate QR

</NavLink>





<NavLink

to="/admin/music"

className={({isActive})=>
isActive ? "active" : ""
}

>

🎧 Library

</NavLink>





<button

className="logout-btn"

onClick={logout}

>

⎋ Logout

</button>



</div>


</nav>

    );

}