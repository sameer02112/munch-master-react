import burgerImage from './../resources/burgerImage.png';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useState } from 'react';

export const LogIn = () => {

    const [isLoginPageVisible, setIsLoginPageVisible] = useState(true);

    return isLoginPageVisible ? (
        <>
        <div className="login-page-container">
            <div className="login-page-text-container">
                <h1>Login</h1>
                <span>or <button onClick={() => setIsLoginPageVisible(false)}>create an account</button></span>
                <form>
            </form>
            </div>
            <img src={burgerImage} alt={'img'}/>
        </div>
        <div className="login-form">
            <FormControl>
            <TextField className="text-field" id="outlined-basic" label="Enter Email" variant="outlined"  />  
            <TextField className="text-field" id="outlined-password-input" label="Password"  type="password" autoComplete="current-password"  margin="normal" />
            <Button className="login-signup-btn" variant="outlined">Login</Button>
            </FormControl>
        </div>
        </>
    ) : (
        <>
        <div className="login-page-container">
            <div className="login-page-text-container">
                <h1>Sign Up</h1>
                <span>or <button onClick={() => setIsLoginPageVisible(true)}>login to your account</button></span>
                <form>
            </form>
            </div>
            <img src={burgerImage} alt={'img'}/>
        </div>
        <div className="signup-form">
            <FormControl>
            <TextField className="text-field" id="outlined-basic" label="Name" variant="outlined" />  
            <TextField className="text-field" id="outlined-basic" label="Phone Number" variant="outlined" margin="normal"/>  
            <TextField className="text-field" id="outlined-basic" label="Enter Email" variant="outlined" margin="normal" />  
            <TextField className="text-field" id="outlined-password-input" label="Password"  type="password" autoComplete="current-password"  margin="normal" />
            <Button className="login-signup-btn" variant="outlined">SignUp</Button>
            </FormControl>
        </div>
        </>
    )
}