import { useEffect } from "react";
import { generateRandomness } from "@mysten/sui/zklogin";
import { ZKLogin, useZKLogin } from "react-sui-zk-login-kit";
import App from "./App";
import "./index.css";


const SUI_PROVER_ENDPOINT = "https://prover-dev.mystenlabs.com/v1";

const providers = {
  google: {
    clientId:"894089065605-jsj6p0nc9uaca4mrfm9lfcrah71s7pkd.apps.googleusercontent.com",
    redirectURI: "http://localhost:5173/",
  },
};

export const Content = () => {
  const { encodedJwt, setUserSalt, address, client } = useZKLogin();

  useEffect(() => {
    if (encodedJwt && address) {
      localStorage.setItem("userAddress", address);
        // console.log(client)
      const storedSalt = localStorage.getItem("userSalt");
      const saltPromise = storedSalt
        ? Promise.resolve(storedSalt)
        : Promise.resolve(generateRandomness());

      saltPromise.then((salt) => {
        setUserSalt(String(salt));
      });
    }
  }, [address, client, encodedJwt, setUserSalt]);

  const storedAddress = localStorage.getItem("userAddress");

  return (
    <div>
      {storedAddress ? (
        <App />
      ) : (
        <>
          <section className=" gradient-background  flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-black text-6xl font-extrabold mb-4">Welcome to Sui ZKLogin</h1>
            <p className=" text-black text-lg mb-4">
              Please login with your Google account to continue.
            </p>

            <ZKLogin
              providers={providers}
              proverProvider={SUI_PROVER_ENDPOINT}
            />
          </section>
        </>
      )}
    </div>
  );
};
export default Content;