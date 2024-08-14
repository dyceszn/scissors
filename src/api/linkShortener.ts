import axios from "axios";
import { db, analytics } from "../Config/firebaseConfig";
import { logEvent } from "firebase/analytics";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// API Keys
const BITLY_API_KEY = process.env.REACT_APP_BITLY_ACCESS_TOKEN;
const REBRANDLY_API_KEY = process.env.REACT_APP_REBRANDLY_ACCESS_TOKEN;

// Bit.ly Link Shortening
export const shortenWithBitly = async (url: string) => {
  const response = await axios.post(
    "https://api-ssl.bitly.com/v4/shorten",
    {
      long_url: url,
    },
    {
      headers: {
        Authorization: `Bearer ${BITLY_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.link;
};

// Rebrandly Link Shortening
export const shortenWithRebrandly = async (url: string) => {
  const response = await axios.post(
    "https://api.rebrandly.com/v1/links",
    {
      destination: url,
    },
    {
      headers: {
        apikey: REBRANDLY_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.shortUrl;
};

// QR Code Generation
export const generateQRCode = (url: string) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    url
  )}`;
};

// Log Link Click
export const logLinkClick = async (shortenedUrl: string) => {
  // Sanitize the shortened URL to avoid slashes in Firestore document paths
  const sanitizedUrl = encodeURIComponent(shortenedUrl);

  logEvent(analytics, "link_click", { shortenedUrl });

  const docRef = doc(db, "linkAnalytics", sanitizedUrl);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      clicks: arrayUnion(new Date().toISOString()),
    });
  } else {
    await setDoc(docRef, {
      clicks: [new Date().toISOString()],
    });
  }
};

// Get Link Analytics
export const getLinkAnalytics = async (shortenedUrl: string) => {
  // Sanitize the shortened URL to avoid slashes in Firestore document paths
  const sanitizedUrl = encodeURIComponent(shortenedUrl);

  const docRef = doc(db, "linkAnalytics", sanitizedUrl);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};
