import React from "react";
import { FolderPen } from "lucide-react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";

function SignUp({ setIsAuthenticated }) {
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign up</div>
        <div className="underline"></div>
        <div className="inputs">
          <div className="input">
            <FolderPen />
            <input type="name" placeholder="Name" />
          </div>
          <div className="input">
            <Mail />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <Lock />
            <input type="password" placeholder="Password" />
          </div>
          <div></div>
          <div className="btns">
          <div className="submit" onClick={handleLogin}>Sign up</div>
            <div className="submit" onClick={handleLogin}>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
