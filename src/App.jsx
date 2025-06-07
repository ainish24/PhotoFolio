import { useState } from "react";
import "./App.css";
import HashLoader from "react-spinners/HashLoader";
import NavbarComponent from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <NavbarComponent />
      {/* <HashLoader
        className="loader"
        color="#36d7b7"
        size={50}
        speedMultiplier={1.5}
        cssOverride={{
          display: "block",
          margin: "0 auto",
        }}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
    </>
  );
}

export default App;
