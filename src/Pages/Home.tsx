import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Aside, Footer, Header } from "../Components";
import HomeStyle from "../Style/Home.module.css";
import { UserContext } from "../Contexts/UserContext";
import Avatar from "../Assets/profile.png";
import { shortenWithBitly, shortenWithRebrandly } from "../api/linkShortener";

// Home component
const Home: React.FC = () => {
  // initialize hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // State variables
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

  // useEffect to check if user is signed in
  useEffect(() => {
    if (!userContext || !userContext.user) {
      navigate("/errmsg", { state: { message: "User not signed in" } });
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [userContext, navigate]);

  if (!userContext) {
    return null;
  }

  const { user, addShortenedLink } = userContext; // Destructuring user and addShortenedLink from userContext

  // Function to handle shortening of link
  const handleShorten = async (platform: string) => {
    let shortened;
    if (platform === "bitly") {
      shortened = await shortenWithBitly(url);
    } else if (platform === "rebrandly") {
      shortened = await shortenWithRebrandly(url);
    }
    if (shortened) {
      setShortenedUrl(shortened); // Update state
      addShortenedLink(shortened); // Save to context and Firestore
    }
  };

  return (
    <div>
      <Header />
      <main>
        <Aside />
        <section className={HomeStyle.section}>
          <div className={HomeStyle.head}>
            <p>Hello, {user?.name}</p>
            <Link to="/analytics" className="link">
              {" "}
              <img
                className={HomeStyle.img}
                src={user?.image ?? Avatar}
                alt=""
              />
            </Link>
          </div>

          <form
            action="#"
            className={HomeStyle.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={HomeStyle.row1}>
              <input
                type="text"
                placeholder="Enter link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className={HomeStyle.row2}>
              <div className={HomeStyle.hr}>
                <hr />
              </div>
              <p>Choose platform</p>
              <div className={HomeStyle.hr}>
                <hr />
              </div>
            </div>

            <div className={HomeStyle.row3}>
              <button onClick={() => handleShorten("bitly")}>bit.ly</button>
              <button onClick={undefined} className={HomeStyle.unavailable}>
                scissors
              </button>
              <button onClick={() => handleShorten("rebrandly")}>
                rebrand.ly
              </button>
            </div>

            <div className={HomeStyle.row4}>
              <input type="text" placeholder="Customize your link" />
              <p>
                <span className={HomeStyle.span}></span> Custom domains coming
                soon...
              </p>
            </div>

            <div className={HomeStyle.row5}>
              <button type="submit">
                {shortenedUrl && (
                  <Link to="/qrcode" state={{ shortenedUrl }} className="link">
                    Scissor
                  </Link>
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
