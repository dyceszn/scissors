import React, { useContext, useEffect } from "react";
import { Aside, Footer, Header } from "../Components";
import QRcodeStyle from "../Style/QRcode.module.css";
import { UserContext } from "../Contexts/UserContext";
import Avatar from "../Assets/profile.png";
import { generateQRCode } from "../api/linkShortener";
import { useLocation, useNavigate, Link } from "react-router-dom";

// QRcode component
const QRcode: React.FC = () => {
  // initialize hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const location = useLocation();
  const shortenedUrl = location.state?.shortenedUrl;

  // useEffect to check if user is signed in
  useEffect(() => {
    if (!userContext || !userContext.user) {
      navigate("/errmsg", {
        state: { message: "User not signed in" },
      });
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [userContext, navigate]);

  if (!userContext) {
    return null;
  }

  const { user } = userContext; // Destructure user from userContext

  return (
    <div>
      <Header />
      <main>
        <Aside />
        <section className={QRcodeStyle.section}>
          <div className={QRcodeStyle.head}>
            <p>Hello, {user?.name}</p>
            <Link to="/analytics" className="link">
              <img
                className={QRcodeStyle.img}
                src={user?.image ?? Avatar}
                alt=""
              />
            </Link>
          </div>

          <div className={QRcodeStyle.row1}>
            <img
              className={QRcodeStyle.qr}
              src={generateQRCode(shortenedUrl)}
              alt=""
            />
          </div>

          <div className={QRcodeStyle.row2}>
            <div className={QRcodeStyle.hr}>
              <hr />
            </div>
            <p>Here's your link</p>
            <div className={QRcodeStyle.hr}>
              <hr />
            </div>
          </div>

          <div className={QRcodeStyle.row3}>
            <p>{shortenedUrl}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QRcode;
