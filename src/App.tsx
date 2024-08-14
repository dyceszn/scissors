import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import "./index.css";
import Loading from "./Components/Loading";

// Lazy loading
const Login = React.lazy(() => import("./Pages/Login"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Home = React.lazy(() => import("./Pages/Home"));
const QRcode = React.lazy(() => import("./Pages/QRcode"));
const Analytics = React.lazy(() => import("./Pages/Analytics"));
const Errormsg = React.lazy(() => import("./Pages/Errormsg"));
const Error404 = React.lazy(() => import("./Pages/Error404"));

// App component
function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/qrcode" element={<QRcode />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/errmsg" element={<Errormsg />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
