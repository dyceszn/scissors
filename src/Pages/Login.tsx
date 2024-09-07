import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Aside, Footer, Header } from "../Components";
import LoginStyle from "../Style/Login.module.css";
import { auth, db } from "../Config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserContext } from "../Contexts/UserContext";

// Login component
const Login: React.FC = () => {
  // initialize hooks
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext);

  // Check if user is signed in
  if (!userContext) {
    navigate("/login");
    return null;
  }

  const { setUser } = userContext;

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // async function to sign in user
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          image: userData.image,
          name: userData.name,
          email: userData.email,
          password: "",
        });
      }
      navigate("/home");
    } catch (error) {
      // Catch error
      console.error("Error signing in: ", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  // Function to handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      setError("Error sending password reset email. Please try again.");
    }
  };

  if (error) {
    // Error handling
    navigate("/errmsg", { state: { message: error } });
    return null;
  }

  return (
    <div>
      <Header />
      <main className={LoginStyle.main}>
        <Aside />
        <section className={LoginStyle.section}>
          <form className={LoginStyle.form} action="#" onSubmit={handleSubmit}>
            <div className={LoginStyle.box1}>
              <p className={LoginStyle.row1}>Sign in</p>
              <input
                className={LoginStyle.row_group}
                type="email"
                placeholder="Enter your e-mail address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className={LoginStyle.row_group}
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={LoginStyle.row4} type="submit">
                Sign in
              </button>
            </div>
            <div className={LoginStyle.box2}>
              {/* <div className={LoginStyle.row5}>
                <button className={LoginStyle.btn}>Continue with Apple</button>
                <button className={LoginStyle.btn}>Continue with Google</button>
              </div> */}
              <div className={LoginStyle.row6}>
                <p>
                  Dont have an account yet? <Link to="/">Create one</Link>
                </p>
                <p className={LoginStyle.signup}>
                  Forgot password?{"  "}
                  <span
                    onClick={handleForgotPassword}
                    className={LoginStyle.forgot_pass}
                  >
                    We gatchu
                  </span>
                </p>
              </div>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
