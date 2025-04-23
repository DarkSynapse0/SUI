import "./App.css";
import TransferSUI from "./components/TransferSUI";
import MintNFT from "./components/MintNFT";
import NavBar from "./components/NavBar.tsx";

function App() {

  return (
    <>
      <NavBar />
      <div>
        
      </div>

      <div>
        <TransferSUI />
        <MintNFT />
      </div>
    </>
  );
}

export default App;
