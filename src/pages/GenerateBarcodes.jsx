import { useEffect, useState } from "react";
import api from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import "../styles/GenerateBarcode.css";


export default function GenerateBarcodes() {


    const [count,setCount] = useState(10);

    const [loading,setLoading] = useState(false);

    const [clearing,setClearing] = useState(false);

    const [clearingAvailable,setClearingAvailable] = useState(false);


    const [stats,setStats] = useState({

        total:0,
        available:0,
        activated:0

    });


    const [modal,setModal] = useState({

        show:false,
        type:""

    });




    useEffect(()=>{

        loadStats();

    },[]);




    async function loadStats(){

        try{

            const res = await api.get(
                "/barcode/stats"
            );


            setStats(res.data);


        }catch(err){

            console.log(err);

        }

    }





    async function generate(){


        try{


            setLoading(true);



            const res = await api.post(

                "/barcode/generate",

                {
                    count
                }

            );



            await generatePDF(
                res.data.barcodes
            );



            alert(
                "QR Codes generated successfully"
            );


            loadStats();



        }catch(err){


            alert(

                err.response?.data?.message ||

                "Generation failed"

            );


        }finally{


            setLoading(false);

        }

    }





    function openClearModal(type){


        setModal({

            show:true,

            type

        });


    }





    async function confirmDelete(){



        try{


            if(modal.type==="all"){


                setClearing(true);


                await api.delete(
                    "/barcode/clear"
                );


            }



            if(modal.type==="available"){


                setClearingAvailable(true);


                const res =
                await api.delete(
                    "/barcode/clear-available"
                );


                alert(
                    res.data.message
                );


            }



            setModal({

                show:false,

                type:""

            });


            loadStats();



        }catch(err){


            alert(

                err.response?.data?.message ||

                "Delete failed"

            );


        }finally{


            setClearing(false);

            setClearingAvailable(false);


        }

    }







async function generatePDF(barcodes){


const pdf = new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});



const qrSize=35;


let x=15;

let y=20;



for(let i=0;i<barcodes.length;i++){


const item=barcodes[i];



const qr =
await QRCode.toDataURL(

item.barcode,

{

width:300,

margin:1

}

);



pdf.addImage(

qr,

"PNG",

x,

y,

qrSize,

qrSize

);



pdf.setFontSize(10);


pdf.text(

item.barcode,

x,

y+qrSize+5

);



x+=60;



if(x>150){

x=15;

y+=60;

}



if(y>250 && i!==barcodes.length-1){

pdf.addPage();

x=15;

y=20;

}



}


pdf.save(
"music_activation_QR_codes.pdf"
);


}







return (

<>


<AdminNavbar/>


<div className="barcode-page">


<div className="barcode-container">



<div className="barcode-header">


<h1>

<i className="bi bi-qr-code"></i>

 QR Code Generator

</h1>


<p>
Generate activation QR codes for music sales
</p>


</div>




{/* STATISTICS */}


<div className="barcode-stats">


<div className="stat-card">

<i className="bi bi-qr-code"></i>

<h3>
{stats.total}
</h3>

<p>Total QR Codes</p>

</div>



<div className="stat-card">

<i className="bi bi-check-circle"></i>

<h3>
{stats.available}
</h3>

<p>Available</p>

</div>



<div className="stat-card">

<i className="bi bi-phone"></i>

<h3>
{stats.activated}
</h3>

<p>Activated</p>

</div>



</div>






<div className="generator-card">



<label>
Number of QR Codes
</label>



<input

type="number"

min="1"

className="qr-number-input"

value={count}

onChange={
(e)=>setCount(Number(e.target.value))
}

/>




<button

className="generate-btn"

disabled={loading}

onClick={generate}

>


{

loading ?

"Generating..."

:

"Generate & Download PDF"

}


</button>




<button

className="clear-btn"

disabled={clearing}

onClick={()=>
openClearModal("all")
}

>


<i className="bi bi-trash"></i>

 Clear All Barcodes


</button>





<button

className="clear-btn"

disabled={clearingAvailable}

onClick={()=>
openClearModal("available")
}

>


<i className="bi bi-trash"></i>

 Clear Available Barcodes


</button>




</div>




</div>

</div>






{/* MODAL */}


{

modal.show &&


<div className="modal-back">


<div className="delete-modal">


<h3>

<i className="bi bi-exclamation-triangle"></i>

 Confirmation

</h3>



<p>


{

modal.type==="all"

?

"Warning! This will permanently delete ALL QR codes including activated ones."

:

"This will delete only unused AVAILABLE QR codes."

}


</p>



<div className="modal-actions">


<button

className="cancel-btn"

onClick={()=>setModal({

show:false,

type:""

})}

>

Cancel

</button>




<button

className="confirm-btn"

onClick={confirmDelete}

>

{

clearing || clearingAvailable

?

"Deleting..."

:

"Yes, Delete"

}


</button>


</div>


</div>


</div>

}



</>

);


}