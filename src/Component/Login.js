import React, { useEffect, useRef, useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';



export default function Login(props) {
    const [loginHidden, setLoginHidden] = useState('aligncenter');
    const [signUpHidden, setSignUpHidden] = useState('aligncenter');

    useEffect(()=>{

        if(props.loginOrSignup == 'login'){
            setLoginHidden('hidden')
        }
        else{
            setSignUpHidden('hidden')
        }
    },[])

    function Changelogin(){
        setLoginHidden('hidden')
        setSignUpHidden('aligncenter')
    }
    function ChangeSignUp(){
        setLoginHidden('aligncenter')
        setSignUpHidden('hidden')
    }

    const emailref = useRef();
    const passRef = useRef();
    const nameRef = useRef();

    const signinEmail = useRef();
    const signinPass = useRef();

    const signUp = () => {
        const emailInput = emailref.current.value;
        const passInput = passRef.current.value;
        const nameInput = nameRef.current.value;

        console.log(emailInput + " - " + passInput + " " + nameInput)
        createUserWithEmailAndPassword(auth, emailInput, passInput)
            .then((userCredential) => {

                updateProfile(auth.currentUser, {
                    displayName: nameInput,
                });
                localStorage.setItem("name", nameInput);
                localStorage.setItem("isLogIn", true);
                // console.log(userCredential.user.displayName)
                props.display(false);
                props.change_login_display(true)
            })
            .catch((error) => {
                // var errorToast = error;
                // M.toast({ html: error });
                if(error.code == 'auth/email-already-in-use'){
                    alert("Email Already Registered please Log in")
                }
                else if(error.code == 'auth/weak-password'){
                    alert('password is weak. Password must be at least 6 digit')
                }
                 console.log(error.code == 'auth/weak-password')
            })

    }

    const login = () => {
        const emailInput = signinEmail.current.value;
        const passInput = signinPass.current.value;

        signInWithEmailAndPassword(auth, emailInput, passInput)
            .then((userCredential) => {
                console.log(userCredential.user.displayName)
                localStorage.setItem("name", userCredential.user.displayName);
                localStorage.setItem("isLogIn", true);
                props.display(false);
                props.change_login_display(true)
            })
            .catch((error) => {
                alert("Invalid Id or Password");
            })
    }


    return (
        <div className='popup flexcenter'>
            <div className={loginHidden}>
                <div className='headingSignup'>Sign up</div>
                <div>
                    <input className='input' type={'name'} placeholder="Name" ref={nameRef}></input>
                </div>

                <div>
                    <input className='input' type={'email'} placeholder="Email" ref={emailref}></input>
                </div>

                <div>
                    <input className='input' type={'password'} placeholder="Password" ref={passRef}></input>
                </div>

                <button className='signupbtn' onClick={signUp}>Sign up</button>
                <p className='link' onClick={Changelogin}>Already User? click for login</p>
            </div>

            <div className={signUpHidden}>
                <div className='headingSignup'>Login</div>


                <div>
                    <input className='input' type={'email'} placeholder="Email" ref={signinEmail}></input>
                </div>

                <div>
                    <input className='input' type={'password'} placeholder="Password" ref={signinPass}></input>
                </div>

                <button className='signupbtn' onClick={login}>Log in</button>
                <p className='link' onClick={ChangeSignUp}>New User? click for Sign Up</p>

            </div>
        </div>
    )
}
