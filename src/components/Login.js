import { useState } from "react";
import axios from "axios";
import { constants } from "../services/constants";

export const LoginMethod = () => {
  const isEmailValid = (text) => /@/.test(text);
  const isPasswordValid = (password) => password.length >= 2;
  const areFormFieldsValid = (email, password) =>
    isEmailValid(email) && isPasswordValid(password);

  return {
    isEmailValid,
    isPasswordValid,
    areFormFieldsValid,
  };
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  const { APIURI, invalidEmail, invalidPassword, loginFailed, loginSuccess } =
    constants;

  const messageHandler = (messageStatus, messageData) => {
    setLoader(false);
    setStatus(messageStatus);
    setMessage(messageData);
    console.log(loader);
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      setMessage("");

      const trimEmail = email.trim();

      // Email validation

      if (!LoginMethod().isEmailValid(trimEmail)) {
        return messageHandler(true, invalidEmail);
      }

      if (!LoginMethod().isPasswordValid(password)) {
        return messageHandler(true, invalidPassword);
      }

      if (!LoginMethod().areFormFieldsValid(trimEmail, password)) {
        return messageHandler(true, "Fields required");
      }

      const data = {
        email: trimEmail,
        password,
      };

      const loginUser = await axios.post(APIURI, data);

      if (loginUser.status === 200) {
        return messageHandler(false, loginSuccess);
      }
    } catch (error) {
      return messageHandler(true, loginFailed);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="font-teko text-7xl text-center title">Prokeep</h1>
          <h2 className="mt-2 text-center font-mont text-xl font-normal text-white">
            Please sign in to your account
          </h2>
        </div>

        <div className="mt-8 login-form w-4/5 mx-auto">
          <div className="bg-white py-8 px-4 login-form shadow rounded-md sm:px-10">
            <form onSubmit={submitForm} className="space-y-6 font-mont">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <h4
                  className={`${
                    status ? "text-red-500" : "text-green-500"
                  } text-sm text-center mb-4`}
                >
                  {message}
                </h4>

                <button
                  type="submit"
                  name="submit"
                  onClick={(e) => submitForm(e)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-md font-semibold text-white bg-blue-500"
                >
                  Sign in
                </button>

                <p className="error text-black text-sm text-center mt-4">
                  Not a member? <span className="cursor-pointer">Sign Up</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
