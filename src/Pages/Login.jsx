import React, { useState, useEffect, useContext } from "react"; // 'use' এর পরিবর্তে 'useContext' ব্যবহার করা ভালো
import googleLogo from "../assets/icons/google.png";
import facebookLogo from "../assets/icons/fb.png";
import { Link, useNavigate, useLocation } from "react-router"; 
import { AuthContext } from "../Provider/AuthProvider"; 
import toast from "react-hot-toast";

const Login = () => {

  const { login, user, googleLogin } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [firebaseError, setFirebaseError] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    setFirebaseError(""); 

    login(email, password)
      .then(() => {
        toast.success("Successfully logged in! Welcome back.");
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        setFirebaseError(error.message);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Successfully logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Facebook Login - Feature not available
  const handleFacebookLogin = () => {
    toast.error("This feature is not available right now.");
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-xl px-12 py-8 border border-gray-400">
            <h1 className="text-xl ml-3 font-bold">Login</h1>
            <div className="card-body">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <fieldset className="fieldset flex flex-col gap-3 ">
                  {firebaseError && (
                    <p className="text-red-500 text-sm">{firebaseError}</p>
                  )}

                  <div className="flex flex-col gap-1">
                    <input required name="email" type="email" className="input border-none" placeholder="Username or Email" />
                    <span className="border-b-1 border-gray-400"></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <input required name="password" type="password" className="input border-none" placeholder="Password" />
                    <span className="border-b-1 border-gray-400"></span>
                  </div>
                  <div className="flex justify-between gap-12">
                    <div className="flex items-center gap-1">
                      <input type="checkbox" name="remember" id="remember" />
                      <span>Remember me</span>
                    </div>
                    <a className="link link-hover text-amber-400">Forgot password?</a>
                  </div>
                  <button className="btn bg-amber-400 text-white hover:bg-amber-500 mt-4">Login</button>
                  <span>
                    Don't have an account?{" "}
                    <Link className="link link-hover text-amber-400" to="/register">Register</Link>
                  </span>
                </fieldset>
              </form>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
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

export default Login;