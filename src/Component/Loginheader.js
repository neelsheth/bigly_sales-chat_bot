import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../Firebase";
import Login from './Login';

export default function Loginheader(props) {

  const provider = new GoogleAuthProvider();
  const [logIn, setLogin] = useState(null);
  const [profilePhot, setphoto] = useState(null);
  const [isLogin, setisLogin] = useState(false);
  const [displayLogin, setdisplayLogin] = useState(false);

  //log in or signup
  const [propsCondition, setCondition] = useState();
  function loginOrSignup(condition) {
    props.change_login_display(false);
    setCondition(condition)
    setdisplayLogin(true);
  }

  //google log in
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setLogin(result.user.displayName)
        // setphoto(result.user.photoURL)
        setisLogin(true)


        localStorage.setItem("name", result.user.displayName);
        localStorage.setItem("isLogIn", true);
        props.change_login_display(true)
        // localStorage.setItem("profilePic", result.user.photoURL);
      })
      .catch((error) => {
        props.change_login_display(true)
        console.log(error);
      });
  };

  useEffect(() => {
    setLogin(localStorage.getItem('name'))
    setisLogin(localStorage.getItem('isLogIn'))
  }, [])

  const logout = () => {

    if (!localStorage.getItem('playing')) {
      if (window.confirm('You want to log out?')) {

        setLogin(null)
        setphoto(null)
        setisLogin(false)
        localStorage.clear();
      }

    }
    else {
      alert("Complete the current quiz")
    }

  }
  useEffect(() => {
    const cur = localStorage.getItem('isLogIn');

    if (cur != null) {

      setisLogin(localStorage.getItem('isLogIn'))
    }

  }, [displayLogin])



  return (
    <div>
      {!isLogin ?
        <>


          <div className='header flexEnd'>
            <div className='logo'>

              <img src='https://wrteam.in/wp-content/uploads/2022/03/white-svg.svg'></img>
            </div>
            <div>

              {/* <div className='flex_row header_btns' >
                <button className='googlelogo' onClick={signInWithGoogle}><img className='logoGoogle' src='https://web.docsales.com/assets/google-login-logo-27bac350625745280a897ea2db51249fcad6aee35613fcc44c40dec2daed43ec.png'></img></button>
                <div className='log_btn space'>|</div>
                <button className='log_btn' onClick={() => loginOrSignup('login')}>Login</button>
                <div className='log_btn space'>|</div>
                <button className='log_btn' onClick={() => loginOrSignup('signup')}>Sign up</button>
              </div> */}
            </div>



          </div> </> : <>


          <div className='header flexEnd'>
            <div className='logo'>

              <img src='https://wrteam.in/wp-content/uploads/2022/03/white-svg.svg'></img>
            </div>
            {/* <div className='flex_row header_btns'>
              <div className='logOut_btn' >{localStorage.getItem('name')}</div>
              <div className='logOut_btn space'>|</div>
              <div className='logOut_btn' onClick={logout}>Log out</div>
            </div> */}


          </div>

        </>}

      {displayLogin && <Login loginOrSignup={propsCondition} display={(condition) => setdisplayLogin(condition)} change_login_display={(c) => props.change_login_display(c)}></Login>}


    </div>
  )
}
