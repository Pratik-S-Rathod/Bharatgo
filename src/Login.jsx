import React, { useRef, useState } from "react";
import { login } from "./redux/cartSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "./firebase"; // Import Firebase Auth & Firestore
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Login() {
  const email = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);

  const dispatch = useDispatch();
  const [isLogIn, setIsLogIn] = useState(true);

  const switchMode = () => {
    setIsLogIn((prevState) => !prevState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const enteredEmail = email.current.value;
    const pas1 = password1.current.value;
    const pas2 = password2.current?.value;

    if (!isLogIn && pas1 !== pas2) {
      alert("Passwords do not match!");
      password1.current.value = "";
      password2.current.value = "";
      return;
    }

    try {
      let userCredential;
      if (isLogIn) {
        // Login user
        userCredential = await signInWithEmailAndPassword(auth, enteredEmail, pas1);
      } else {
        // Register user
        userCredential = await createUserWithEmailAndPassword(auth, enteredEmail, pas1);
        
        // Store user data in Firestore (Only for new users)
        await setDoc(doc(db, "users", userCredential.user.uid), {
          email: enteredEmail,
          createdAt: new Date().toISOString(),
        });
        console.log("User data saved to Firestore!");
      }

      const token = await userCredential.user.getIdToken();
      dispatch(login({ token }));
      console.log("Token:", token);

    } catch (err) {
      alert("Authentication failed: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogIn ? "Log In" : "Sign Up"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-left">Email</label>
            <input
              type="email"
              ref={email}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-left">Password</label>
            <input
              type="password"
              ref={password1}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          {!isLogIn && (
            <div>
              <label className="block text-gray-600 text-left">
                Confirm Password
              </label>
              <input
                type="password"
                ref={password2}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            {isLogIn ? "Log In" : "Sign Up"}
          </button>
        </form>
        <button
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
          onClick={switchMode}
        >
          {isLogIn ? "Create an account" : "Have an account? Log In"}
        </button>
        <button
          type="button"
          className="mt-4 w-full p-2 bg-gray-600 text-white font-semibold rounded hover:bg-gray-700 transition"
          onClick={() => dispatch(login({ token: "guest" }))}
        >
          Login as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
