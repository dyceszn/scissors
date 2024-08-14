import React, { useContext, useState, useEffect } from "react";
import { Aside, Footer, Header } from "../Components";
import AnalyticsStyle from "../Style/Analytics.module.css";
import { UserContext } from "../Contexts/UserContext";
import Avatar from "../Assets/profile.png";
import {
  logLinkClick,
  getLinkAnalytics,
  generateQRCode,
} from "../api/linkShortener";
import { useNavigate } from "react-router-dom";
import { auth } from "../Config/firebaseConfig";

// Analytics component
const Analytics: React.FC = () => {
  // initialize hooks
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  // use state
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [clicksByDate, setClicksByDate] = useState<any[]>([]);

  // To check if user is signed in
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

  const { user, shortenedLinks } = userContext; // Destructuring user and shortenedLinks from userContext

  // Function to handle link click
  const handleLinkClick = async (link: string) => {
    try {
      const sanitizedLink = encodeURIComponent(link);
      setSelectedLink(sanitizedLink);
      await logLinkClick(sanitizedLink);
      const data = await getLinkAnalytics(sanitizedLink);
      setAnalyticsData(data);
      setClicksByDate(data?.clicks || []);
    } catch (error) {
      console.error("Error logging link click:", error);
    }
  };

  // Function to handle sign out
  const handleSignOut = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <main className={AnalyticsStyle.main}>
        <Aside />
        <section className={AnalyticsStyle.section}>
          <div className={AnalyticsStyle.head}>
            <p>Hello,</p>
          </div>

          <div className={AnalyticsStyle.box1}>
            <div className={AnalyticsStyle.col1}>
              <img
                className={AnalyticsStyle.img}
                src={user?.image ?? Avatar}
                alt=""
              />
            </div>

            <div className={AnalyticsStyle.col2}>
              <p className={AnalyticsStyle.p}>Name: {user?.name}</p>
              <p className={AnalyticsStyle.p}>Email address: {user?.email}</p>
              <p className={AnalyticsStyle.p}>
                No of links: {shortenedLinks.length}
              </p>
              <p
                className={AnalyticsStyle.p}
                onClick={handleSignOut}
                style={{ color: "red", cursor: "pointer" }}
              >
                Logout
              </p>
            </div>
          </div>

          <p className={AnalyticsStyle.box2}>Shortened links</p>

          <div className={AnalyticsStyle.box3}>
            <div className={AnalyticsStyle.col3}>
              <ul className={AnalyticsStyle.ul}>
                {shortenedLinks.map((link, index) => (
                  <li key={index} onClick={() => handleLinkClick(link)}>
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {selectedLink && <hr />}
            {selectedLink && (
              <div className={AnalyticsStyle.col4}>
                {analyticsData ? (
                  <>
                    <p>No of clicks: {analyticsData.clicks.length || "N/A"}</p>
                    <div className={AnalyticsStyle.canvas}>
                      <img src={generateQRCode(selectedLink)} alt="" />
                    </div>
                    <p>Your latest clicks:</p>
                    <ul>
                      {clicksByDate.slice(0, 5).map((click, index) => (
                        <li key={index}>{click}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div>
                    <p>No analytics data available for this link.</p>
                    <br />
                    <hr />
                    <p>Here's your qrcode tho...</p>
                    <div className={AnalyticsStyle.canvas}>
                      <img src={generateQRCode(selectedLink)} alt="" />
                    </div>
                    <br />
                    <hr />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
