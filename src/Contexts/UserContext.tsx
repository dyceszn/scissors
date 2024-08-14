import React, { createContext, useState, ReactNode, useEffect } from "react";
import { db } from "../Config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
  image: string | null;
  name: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  shortenedLinks: string[];
  addShortenedLink: (link: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [shortenedLinks, setShortenedLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      if (user) {
        const userRef = doc(db, "users", user.email!);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setShortenedLinks(userData?.shortenedLinks || []);
        }
      }
    };

    fetchLinks();
  }, [user]);

  const addShortenedLink = async (link: string) => {
    const updatedLinks = [...shortenedLinks, link];
    setShortenedLinks(updatedLinks);

    if (user) {
      const userRef = doc(db, "users", user.email!);
      await setDoc(userRef, { shortenedLinks: updatedLinks }, { merge: true });
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, shortenedLinks, addShortenedLink }}
    >
      {children}
    </UserContext.Provider>
  );
};
