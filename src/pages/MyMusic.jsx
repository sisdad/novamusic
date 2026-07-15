import React, { useEffect, useState } from "react";
import "../styles/MyMusic.css";


function MyMusic(){


const [songs,setSongs]=useState([]);

const [message,setMessage]=useState(
"Loading music..."
);


const [playingId,setPlayingId]=useState(null);

const [currentIndex,setCurrentIndex]=useState(-1);





useEffect(()=>{


const loadMusic=async()=>{


const deviceId =
localStorage.getItem("device");



if(!deviceId){

setMessage(
"Device not activated."
);

return;

}




try{


const response =
await fetch(

"http://10.47.248.86:5000/api/music/my-music",

{

headers:{

"device-token":deviceId

}

}

);



const data =
await response.json();




if(data.success){


setSongs(data.music);



if(data.music.length===0){

setMessage(
"No music available."
);

}

else{

setMessage("");

}


}

else{


setMessage(
data.message ||
"Failed loading music"
);


}



}

catch(err){


console.log(err);


setMessage(
"Server connection failed."
);


}



};


loadMusic();


},[]);









const playSong=(song,index)=>{


if(playingId===song.id){


setPlayingId(null);


}

else{


setPlayingId(song.id);


setCurrentIndex(index);


}



};









const nextSong=()=>{


if(songs.length===0)
return;



const nextIndex =

currentIndex === songs.length-1

?

0

:

currentIndex+1;



setCurrentIndex(nextIndex);


setPlayingId(
songs[nextIndex].id
);



};









return(


<div className="music-page">



<div className="music-header">


<h1>
🎵 My Music
</h1>


<p>
Your personal music collection
</p>


</div>






{

message &&


<div className="message-box">

{message}

</div>


}







<div className="song-grid">



{

songs.map((song,index)=>(



<div

key={song.id}

className={

playingId===song.id

?

"song-card active"

:

"song-card"

}


>





<img

src={

"http://10.47.248.86:5000/"

+

song.cover_image

}

alt={song.title}

/>







<div className="song-info">


<h3>

{song.title}

</h3>



<p>

{song.artist}

</p>





<button

onClick={()=>
playSong(song,index)
}

>


{

playingId===song.id

?

"⏸ Pause"

:

"▶ Play"

}


</button>





{

playingId===song.id &&



<audio

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





</div>



</div>



))


}



</div>



</div>


);


}


export default MyMusic;