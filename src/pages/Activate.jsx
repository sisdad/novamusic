import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function Activate() {

    const { code } = useParams();

    const navigate = useNavigate();

    const [message, setMessage] = useState(
        "Activating..."
    );


    useEffect(() => {


        const activate = async () => {


            let device =
                localStorage.getItem("device");


            // Create device identity first time
            if (!device) {

                device =
                    "device-" +
                    Date.now() +
                    "-" +
                    Math.random()
                        .toString(36)
                        .substring(2);


                localStorage.setItem(
                    "device",
                    device
                );

            }



            try {


                console.log({
                    barcode: code,
                    deviceToken: device
                });



                const response =
                    await api.post(

                        "/barcode/activate",

                        {
                            barcode: code,
                            deviceToken: device
                        }

                    );



                const data =
                    response.data;



                if (data.success) {


                    setMessage(
                        "Activation successful"
                    );


                    setTimeout(() => {


                        navigate("/my-music");


                    }, 1500);


                }

                else {


                    setMessage(
                        data.message
                    );


                }



            }

            catch(error) {


                console.log(error);


                setMessage(

                    error.response?.data?.message ||

                    "Server connection failed"

                );


            }


        };



        activate();



    }, [code, navigate]);




    return (

        <div className="container text-center mt-5">


            <h2>
                {message}
            </h2>


        </div>

    );


}


export default Activate;