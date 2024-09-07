import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Aside, Footer, Header } from "../Components";
import SignupStyle from "../Style/Signup.module.css";
import { UserContext } from "../Contexts/UserContext";
import { auth, db, storage } from "../Config/firebaseConfig"; // Import storage
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Signup component
const Signup: React.FC = () => {
  // initialize hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // State variables
  const [formData, setFormData] = useState({
    image: null as string | null,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!userContext) {
    navigate("/login");
    return null;
  }

  const { setUser } = userContext;

  // Function to handle form input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle image upload
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const imageRef = ref(storage, "images/" + file.name);
    try {
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      setFormData({
        ...formData,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { image, name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // async function to create user with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        // Update user profile
        displayName: name,
        photoURL: image,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        // Save user data to Firestore
        image,
        name,
        email,
      });
      // set user context
      setUser({
        image,
        name,
        email,
        password: "",
      });
      navigate("/home");
    } catch (error) {
      // Error handling
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
      } else {
        console.error("Error signing up:", error);
      }
      navigate("/errmsg", {
        state: { message: "Error signing up... try again" },
      });
    }
  };

  return (
    <div>
      <Header />
      <main>
        <Aside />
        <section className={SignupStyle.section}>
          <form className={SignupStyle.form} onSubmit={handleSubmit}>
            <p className={SignupStyle.row1}>Create Account</p>
            <div className={SignupStyle.row2}>
              <div className={SignupStyle.col1}>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <input
                className={SignupStyle.col2}
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <input
              className={SignupStyle.row_group}
              type="email"
              placeholder="Enter e-mail address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className={SignupStyle.row_group}
              type="password"
              placeholder="Enter a password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className={SignupStyle.row_group}
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className={SignupStyle.row6}>
              <div className={SignupStyle.terms}>
                <input type="checkbox" name="terms" id="terms" required />
                <label htmlFor="terms"> I agree to terms of service</label>
              </div>

              <p className={SignupStyle.login}>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <button type="submit" className={SignupStyle.row7}>
              Sign up
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
