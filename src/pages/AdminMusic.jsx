import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import "../styles/AdminMusic.css";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminMusic(){


    const [songs,setSongs] = useState([]);


    const [selectedSong,setSelectedSong] = useState(null);
    const [deleteId, setDeleteId] = useState(null);


    const [playingId,setPlayingId] = useState(null);

    const [currentIndex,setCurrentIndex] = useState(-1);

     const audioRefs = useRef({});


    const [form,setForm] = useState({

        title:"",
        artist:""

    });



    const [musicFile,setMusicFile] = useState(null);

    const [coverFile,setCoverFile] = useState(null);





    useEffect(()=>{

        loadMusic();

    },[]);







    const loadMusic = async()=>{


        try{


            const res = await api.get(
                "/music/all"
            );


            setSongs(
                res.data.music
            );


        }

        catch(err){

            console.log(err);

        }


    };








    // PLAY / PAUSE

    const playSong = (song,index)=>{


    setPlayingId(song.id);

    setCurrentIndex(index);


};

const nextSong = ()=>{


    if(songs.length === 0)
        return;



    const nextIndex =
    currentIndex === songs.length - 1

    ?

    0

    :

    currentIndex + 1;



    const next = songs[nextIndex];



    setCurrentIndex(nextIndex);

    setPlayingId(next.id);



};









    // EDIT MODAL


    const openEdit = (song)=>{


        setSelectedSong(song);


        setForm({

            title:song.title,

            artist:song.artist

        });


        setMusicFile(null);

        setCoverFile(null);


    };








    const changeHandler=(e)=>{


        setForm({

            ...form,

            [e.target.name]:

            e.target.value

        });


    };









    // UPDATE


    const updateMusic = async(e)=>{


        e.preventDefault();



        try{


            const data = new FormData();



            data.append(
                "title",
                form.title
            );



            data.append(
                "artist",
                form.artist
            );




            if(musicFile){

                data.append(
                    "music",
                    musicFile
                );

            }




            if(coverFile){

                data.append(
                    "cover",
                    coverFile
                );

            }





            const res = await api.put(

                `/music/${selectedSong.id}`,

                data,

                {

                    headers:{

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );





            alert(
                res.data.message
            );



            setSelectedSong(null);


            loadMusic();



        }

        catch(err){


            console.log(err);


            alert(

                err.response?.data?.message ||

                "Update failed"

            );


        }


    };









    // DELETE


const deleteMusic = async()=>{

    try{

        const res =
        await api.delete(
            `/music/${deleteId}`
        );


        alert(
            res.data.message
        );


        setDeleteId(null);

        loadMusic();


    }

    catch(err){

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Delete failed"
        );

    }

};









return (

<>

<AdminNavbar/>
<div className="admin-music">


<h1>
🎵 Music Management
</h1>






<div className="music-list">



{

songs.map((song,index)=>(


<div

className="music-card"

key={song.id}

>




<img

src={
"http://10.47.248.86:5000/"
+
song.cover_image
}

alt={song.title}

/>






<div className="music-info">


<h3>

{song.title}

</h3>



<p>

{song.artist}

</p>


</div>







<button

className="play-btn"

onClick={()=>
playSong(song,index)
}

>


{

playingId === song.id

?

"⏸ Pause"

:

"▶ Play"

}



</button>








{

playingId === song.id &&


<audio

ref={(el)=>
audioRefs.current[song.id]=el
}

controls

autoPlay

controlsList="nodownload"

onEnded={nextSong}

>


<source

src={

"http://10.47.248.86:5000/"

+

song.music_file

}

type="audio/mpeg"

/>


Your browser does not support audio.


</audio>


}








<div className="song-actions">



<button

className="edit-btn"

onClick={()=>
openEdit(song)
}

>

✏ Edit

</button>






<button

className="delete-btn"

onClick={()=>
setDeleteId(song.id)
}

>

🗑 Delete

</button>



</div>






</div>



))


}



</div>













{
selectedSong &&



<div className="modal-overlay">



<div className="edit-modal">



<h2>

Update Music

</h2>






<form

onSubmit={updateMusic}

>




<label>

Title

</label>


<input

className="form-control"

name="title"

value={form.title}

onChange={changeHandler}

/>







<label>

Artist

</label>


<input

className="form-control"

name="artist"

value={form.artist}

onChange={changeHandler}

/>







<label>

Replace Music File

</label>


<input

className="form-control"

type="file"

accept="audio/*"

onChange={(e)=>

setMusicFile(
e.target.files[0]
)

}

/>







<label>

Replace Cover Image

</label>


<input

className="form-control"

type="file"

accept="image/*"

onChange={(e)=>

setCoverFile(
e.target.files[0]
)

}

/>








<button

className="save-btn"

>

Save Changes

</button>







<button

type="button"

className="cancel-btn"

onClick={()=>

setSelectedSong(null)

}

>

Cancel

</button>




</form>



</div>


</div>


}

{
deleteId &&

<div className="modal-overlay">


<div className="delete-modal">


<h2>
Delete Music?
</h2>


<p>
Are you sure you want to permanently delete this song?
</p>



<div className="delete-actions">


<button

className="confirm-delete"

onClick={deleteMusic}

>

Yes, Delete

</button>




<button

className="cancel-btn"

onClick={()=>setDeleteId(null)}

>

Cancel

</button>


</div>



</div>


</div>

}

</div>

</>
);


}