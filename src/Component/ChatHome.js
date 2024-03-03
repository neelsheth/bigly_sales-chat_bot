import React, { useEffect, useState } from 'react'
import ChatBot from 'react-simple-chatbot'
import './style.css'
import { ThemeProvider } from 'styled-components';
import Loginheader from './Loginheader';
import Test from './Test';
//https://lucasbassetti.com.br/react-simple-chatbot/#/docs/themes
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase';
import skype from './img/skype.png'
import email from './img/email.png'
import telephone from './img/telephone.png'

export default function ChatHome() {

    var name_new, company_new, email_new, mobile_new = "";
    const [audio, setAudion] = useState(true);







    const theme = {
        background: '#2121211A',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '   white',
        headerFontColor: '#000000',
        headerFontSize: '20px',
        botBubbleColor: '#444444',
        botFontColor: '	#FFFFFF',
        userBubbleColor: 'white',
        userFontColor: '#4a4a4a',
    };

    const [ans, setans] = useState(null);

    const steps = [

        {
            id: "Greet",

            message: "Hello, Welcome to Bigly Sales, My name is Thomas Ryan",

            trigger: "Done",
        },
        {
            id: "Done",

            message: "Please enter your name!",

            trigger: "waiting1",
        },
        {
            id: "waiting1",

            placeholder: 'Your Name....',

            user: true,

            validator: (value) => {
               
                if (value.length == 0 || value == " ") {
                    return 'Enter Name';
                }
                name_new = value;


                return true;
            },

            trigger: "number",

        },
        {

            id: "number",

            placeholder: 'phone Number....',

            message: "Hi {previousValue}, Please enter your Number",

            trigger: "waiting_n1",

        },

        {

            id: "waiting_n1",

            user: true,

            validator: (value) => {
                
                if (isNaN(value) || value.length <= 0) {

                    return 'value should be a number';
                }

                mobile_new = value;

                return true;
            },

            trigger: "email",

        },
        {
            id: "email",

            message: "Please enter your Email!",

            trigger: "email_inp",
        },
        {

            id: "email_inp",

            user: true,

            validator: (value) => {
                if (value.length <= 0) {

                    return 'Enter Valid Email';
                }

                email_new = value;
                return true;
            },

            trigger: "company_name",

        },
        {
            id: "company_name",

            message: "Please enter your company name!",

            trigger: "company_name_inp",
        },
        {

            id: "company_name_inp",

            user: true,

            validator: (value) => {
                company_new = value;

                save_data();
                return true;

            },

            trigger: "post_presale",

        },


        {
            id: "post_presale",

            message: "Please select one option",

            trigger: "option",
        },
        {

            id: "option",

            placeholder: 'Please select an option....',

            options: [

                { value: "Pre_sales", label: "SMS/MMS Blast", trigger: "Pre_sales" },

                { value: "post_sales", label: "Global Power Dialing", trigger: "post_sales" },

                { value: "custom_project", label: "Video texting campaigns", trigger: "hire" },


            ],
            // query_ask

        },
        {
            id: "Pre_sales",
          
            component: (
                <>
                    
                       
                    
                    <div className='custom'>
                        <p style={{ margin: '20px' }} >
                            Let Bigly set up your marketing campaign to comply with 10DLC so your messages reach your targets every time.

                        </p>
                        <p style={{ margin: '20px' }} >
                            (Don't know what 10DLC is? We do. That's an even better reason to use Bigly)
                        </p>
                        <p><a href='https://biglysales.com/' target='_blank'>More info</a></p>
                    </div>
                </>
            ),


            trigger: "goback_from",


        },
        {

            id: "goback_from",

            options: [

                { value: "option", label: "Go Back", trigger: "option" },
            ],

        },
        {

            id: "post_sales",

            component: (
                <>
                  
                    <div className='custom'>
                        <p style={{ margin: '20px' }} >
                            Use Bigly's power dialing technology to reach customers three times faster. Call the USA and Canada from anywhere worldwide. Get your entire global team on one phone system. Transfer calls to anyone globally.
                        </p>
                        <p><a href='https://biglysales.com/' target='_blank'>More info</a></p>
                    </div>
                </>
            ),
            trigger: "goback_from",

        },
        {

            id: "hire",

            component: (
                <>
                    
                    <div className='custom'>
                        <p style={{ margin: '20px' }} >
                            Has a friend ever sent you a video by text? Cool right? Be one of the first companies to send Instagram type reels to your clients using text. These are the best performing campaigns that we have ever seen!
                        </p>

                        <p><a href='https://biglysales.com/' target='_blank'>More info</a></p>
                    </div>
                </>
            ),
            trigger: "goback_from",

        },

    ];



    const config = {
        // botAvatar: "https://scontent.fstv5-1.fna.fbcdn.net/v/t39.30808-6/241190298_1029370764541379_8026433861392322788_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rwzWRrYkThwAX-shlVJ&_nc_ht=scontent.fstv5-1.fna&oh=00_AfBWNn0FDKo2Vyz3R3SR8LIMdfsjum6nSqQYohEJlLn-Hg&oe=641C99C4",
        floating: true,
    };
    var cus_id = 0;
    function save_data() {


        const formdata = new FormData();
        formdata.append("name", name_new);
        formdata.append("mobile", mobile_new);
        formdata.append("company", company_new);
        formdata.append("email", email_new);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch("https://crm.singhit.in/api/customers/save", requestOptions)
            .then((response) => response.json()) //res.json()
            .then((result) => cus_id = result.data.id)
            .catch((error) => console.error(error));
    }

    function save_feature(id) {
 
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("customer_id", cus_id);
            urlencoded.append("feature_id", id);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: urlencoded,
                redirect: "follow"
            };

            fetch("https://crm.singhit.in/api/enquiries/save", requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));

        


    }





    return (

        <div style={{ marginTop: '25px' }} >
            <div>
                <div className='flex'>
                    <ThemeProvider theme={theme}>
                        <ChatBot

                            headerTitle="Bigly Sales"
                            speechSynthesis={{ enable: audio, lang: 'en' }}
                            // floating={true}
                            width={"600px"}
                            // recognitionEnable={true}
                            steps={steps}
                            bubbleOptionStyle={{
                                'background-color': 'white',
                                'box-shadow': '0px 4px 16px #2121210F',
                                'color': "black",
                                'border-radius': '8px',
                                'border': '0.5px solid #444444',
                                'opacity': '1',
                                'list-style': 'disc inside',
                                'align-items': 'center',
                                'min-width': '175px',
                                'cursor': 'pointer',
                            }}
                            customStyle={{
                                //for custom component style
                                'padding': '0px',
                                'margin': '10px',
                                'max-width': '500px',
                                'margin-left': '10px',
                                // "border-radius": "20px",
                                // 'border-bottom-left-radius': '0px',
                                'background-color': 'rgb(232,232,232)',
                                'box-shadow': 'none',
                            }}
                            avatarStyle={{
                                // 'padding': 'px',
                                "border-radius": "50%",
                            }}
                            bubbleStyle={{
                                'border-bottom-left-radius': '15px',
                                'border-top-right-radius': '15px',
                                'border-top-left-radius': '0px',
                                'border-bottom-right-radius': '0px',
                            }}
                        // {...config}
                        // botAvatar={"https://scontent.fstv5-1.fna.fbcdn.net/v/t39.30808-6/241190298_1029370764541379_8026433861392322788_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rwzWRrYkThwAX-shlVJ&_nc_ht=scontent.fstv5-1.fna&oh=00_AfBWNn0FDKo2Vyz3R3SR8LIMdfsjum6nSqQYohEJlLn-Hg&oe=641C99C4"}
                        />

                    </ThemeProvider>

                </div>
            </div>
        </div>
    )
}
