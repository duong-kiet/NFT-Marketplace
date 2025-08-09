import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchSection from "./components/SearchSection";
import Profile from "./components/Profile";
import NFTCollection from "./components/NFTCollection";
import { AddressContext } from "./context/AddressContext";
import "./App.css";
import MintEvent from "./components/MintEvent";
import TransferEvent from "./components/TransferEvent";

function App() {
  const [address, setAddress] = useState("");

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      <NavBar />
      <SearchSection />
      <Profile />
      <NFTCollection />
      <MintEvent />
      <TransferEvent />
    </AddressContext.Provider>
  );
}

export default App;
