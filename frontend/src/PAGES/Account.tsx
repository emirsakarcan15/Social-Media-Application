import React from 'react'
import TextType from '../HELPERS/TextType';
import TextField from '@mui/material/TextField';
import "../CSS/Account.css"
import photoOne from "../ASSETS/photoOne.jpg"
import photoTwo from "../ASSETS/photoTwo.jpg"
import { toast } from 'react-toastify';


function Account() {

    const navigateToLogIn = () => {
        document.getElementById("logIn")?.scrollIntoView({ behavior: "smooth" });
    }

    const navigateToSignIn = () => {
        document.getElementById("signInForm")?.scrollIntoView({ behavior: "smooth" });
    }

    const handleSignUp = async () => {
        let username = document.getElementById("userNameInput").value
        let password = document.getElementById("passwordInput").value
        let rePassword = document.getElementById("re-passwordInput").value

        const user = {
            username: username,
            password: password,
            rePassword: rePassword
        }

        const response = await fetch("http://localhost:3000/api/social/account/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user),
        })

        const data = await response.json()

        if (!response.ok) {
            return toast.error(data.message)
        }

        else {
            toast.success(data.message)
            window.location.href="/profile"
        }
    }

    const handleLogIn = async () => {
        let username = document.getElementById("userNameInputLogIn").value
        let password = document.getElementById("passwordInputLogIn").value



        const user = {
            username: username,
            password: password
        }

        const responseLogin = await fetch("http://localhost:3000/api/social/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(user),
        })

        const dataLogin = await responseLogin.json()
        toast.success(dataLogin.message)
        window.location.href="/profile"
    }

  return (
    <div style={{ display:"flex", flexDirection:"column", marginTop:"40px"}}> 
        <div style={{ display:"flex", flexDirection:"row"}}>
            <TextType 
                text={["Swipe. Discover. Connect. Experience moments in their most authentic form."]}
                typingSpeed={50}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#000000"]}
                className='text-type'
                
            />
            <div id="signInForm" >
                <h2 id='signInTitle' >Get Started</h2>
                <div id="inputs" >
                    <TextField id="standard-basic" id='userNameInput' label="Username" variant="standard" color='black' />
                    <TextField id="standard-basic" id='passwordInput' label="Password" type='password' variant="standard" color='black' />
                    <TextField id="standard-basic" id='re-passwordInput' label="Re-password" type='password' variant="standard" color='black' />
                </div>
                <button id='signInButton' onClick={handleSignUp} >Sign Up</button>
                <button id='alreadyHave' onClick={navigateToLogIn} >Already Have An Account</button>
            </div>

        </div>
        <div id="logIn" style={{ display: "flex", flexDirection: "row", marginTop: "200px" }} >
            <div id="logInForm" >
                <h1 id='logInTitle' >Welcome Back!</h1>
                <div id="inputs" >
                    <TextField id='userNameInputLogIn' label="Username" variant="standard" color='black' />
                    <TextField id='passwordInputLogIn' label="Password" type='password' variant="standard" color='black' />
                </div>
                <button id="logInButton" onClick={handleLogIn} >Log In</button>
                <button id='dontHave' onClick={navigateToSignIn} >Don't Have An Account</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems: "center" }} >
               <img src={photoOne} alt="img" id="photos" />
               <img src={photoTwo} alt="img" id="photos" />

            </div>

        </div>

    </div>
  )
}

export default Account