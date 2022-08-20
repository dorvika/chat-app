import "./googleLogin.scss";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import App from "../../App";
import { getProductsFromLS, setProductsToLS } from "../../helpers/localStorage";
import { useScript } from "../../helpers/customHook";

const GoogleLogin = () => {
  const [userInfo, setUserInfo] = useState(getProductsFromLS("user") || {});

  useEffect(() => {
    setProductsToLS("user", userInfo);
  }, [userInfo]);

  const handleGoogleResponse = (response) => {
    const userObj = jwt_decode(response.credential);
    setUserInfo({
      name: userObj.name,
      email: userObj.email,
      imageUrl: userObj.picture,
    });
  };

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id:
        "178831107433-hihnsa5ng22od62nqtd3mj3jcoeddvus.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  });

  return (
    <>
      {Object.keys(userInfo).length !== 0 ? (
        <App userInfo={userInfo} setUserInfo={setUserInfo} />
      ) : (
        <section className="login__container">
          <header className="login__header">Chat App</header>
          <div className="login__card">
            <div className="instructions">
              <h2>To use Chat App on your computer:</h2>
              <ol>
                <li>You need to Sign In using your Google Account.</li>
                <li>You can anytime logout from the Web.</li>
                <li>Click on Sign In button to continue using the Chat App.</li>
              </ol>
              <div id="signInDiv"></div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default GoogleLogin;
