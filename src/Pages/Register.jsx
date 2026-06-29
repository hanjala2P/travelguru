import React, { useState, useContext } from 'react'; // useContext ইমপোর্ট করলাম
import googleLogo from "../assets/icons/google.png";
import facebookLogo from "../assets/icons/fb.png";
import { Link, useNavigate } from "react-router"; 
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from "firebase/auth";
import toast from 'react-hot-toast';

const Register = () => {
   
    const { createUser, googleLogin } = useContext(AuthContext); 
    const navigate = useNavigate();

    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firebaseError, setFirebaseError] = useState('');

   
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;

        if (name.length < 3) {
            setNameError('Name must be at least 3 characters long');
            return;
        }
        setNameError('');

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }
        setPasswordError('');
        
        setFirebaseError(''); 

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, { displayName: name })
                .then(() => {
                    toast.success("Account created successfully!");
                    form.reset();
                    navigate('/');
                })
                .catch((profileError) => console.error(profileError));
            })
            .catch((error) => {
                toast.error(error.message);
                setFirebaseError(error.message);
            });
    };

  
    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Successfully registered with Google!");
                navigate('/');
            })
            .catch((error) => toast.error(error.message));
    };

    const handleFacebookLogin = () => {
        toast.error("This feature is not available right now.");
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col ">
                    <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-xl px-12 py-8 border border-gray-400">
                        <h1 className="text-xl ml-3 font-bold">Register</h1>
                        <div className="card-body">
                            <form onSubmit={handleRegister} className="flex flex-col gap-4">
                                <fieldset className="fieldset flex flex-col gap-3 ">
                                    {firebaseError && <p className="text-red-500 text-sm">{firebaseError}</p>}
                                    
                                    <div className="flex flex-col gap-1">
                                        <input required name="email" type="email" className="input border-none " placeholder="Email" />
                                        <span className="border-b-1 border-gray-400"></span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input required name="name" type="text" className="input border-none " placeholder="Name" />
                                        <span className="border-b-1 border-gray-400"></span>
                                        {nameError && <p className="text-red-500 text-xs">{nameError}</p>}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <input required name="password" type="password" className="input border-none " placeholder="Password" />
                                        <span className="border-b-1 border-gray-400"></span>
                                        {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                                    </div>
                                    
                                    <button className="btn bg-amber-400 text-white hover:bg-amber-500 mt-4 ">Register</button>
                                    
                                    <span>Already have an account? <Link className="link link-hover text-amber-400" to="/auth/login">Login</Link></span>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 items-center ">
                        <p className="border-b-1 w-34 border-gray-400 p-2"></p>
                        <p className="text-gray-500 mt-3">or</p>
                        <p className="border-b-1 w-34 border-gray-400 p-2"></p>
                    </div>
                    
                    <div className="flex flex-col gap-3 w-full items-center">
                      
                        <button onClick={handleGoogleLogin} className="btn btn-outline border-gray-400 rounded-4xl btn-neutral w-64">
                            <img src={googleLogo} alt="Google" className="w-5 h-5" /> Continue with Google
                        </button>
                       
                        <button onClick={handleFacebookLogin} className="btn btn-outline border-gray-400 rounded-4xl btn-neutral w-64">
                            <img src={facebookLogo} alt="Facebook" className="w-5 h-5" /> Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;