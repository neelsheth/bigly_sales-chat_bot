// import React, { useEffect, useRef, useState } from 'react'
// import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Firebase';
 
import React,{ useEffect, useState } from "react"



export default function Test(props) {
    const [data,setData] = useState(null);


    useEffect(()=>{
        const formdata = new FormData();
        formdata.append("name", "name_new");
           formdata.append("mobile", "7665567678");
        formdata.append("company", "company_new");
        formdata.append("email", "email_new@gmail.com");

        const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
        };
//then((result) => setData(result.data.id))
        fetch("https://brief-liberal-lizard.ngrok-free.app/api/customers/save", requestOptions)
        .then((response) => response.json()) //res.json()
        .then((result) => setData(result.data))
        .catch((error) => console.error(error));

    },[])
  

    return (
        <>
            {console.log(data)}
        {data && <div style={{width: "100%"}}>

            <div className='custom'>
                    <div> {data.id}</div>
                    <hr></hr>
                    <div> {data.company}</div>
                    <hr></hr>
                    <a href='https://wa.me/9033646589' target={'_blank'}><img src='https://cdn.pixabay.com/photo/2021/05/22/11/38/whatsapp-6273368_1280.png' width={'20px'}></img></a>
            </div>
            
            
            
            </div>}

            
            </>
        
    )
}


