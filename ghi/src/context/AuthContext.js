import { createContext, useState } from "react";


const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loginError, setLoginError] = useState("")

    const [signUpError, setSignUpError] = useState("")

    const [account, setAccount] = useState("")

    const [token, setToken] = useState(null);

    const [loginCred, setLoginCred] = useState({
        username: "",
        password: "",
        })

    const [signUpCred, setSignUpCred] = useState({
        email: "",
        username: "",
        password: "",
        })

    const getToken = async (event) => {
        return fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/token`, {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => data?.access_token ?? null)
        .catch(console.error);
    };

    const signup = async (event) => {
        const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts`
        fetch(url, {
            method: "post",
            body: JSON.stringify(signUpCred),
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then(() => login())
        .catch(console.error);
    };

    const login = async () => {
        try {
            const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/token`;
            const form = new FormData();
            form.append("username", loginCred.username);
            form.append("password", loginCred.password);
            const response = await fetch(url, {
                method: "post",
                credentials: "include",
                body: form,
            });
            if (response.ok) {
                const token = await getToken();
                if (token) {
                    setToken(token);
                    setLoginError("");
                    getAccountData();
                    return token;
                } else {
                    throw new Error("Failed to get token after login.");
                }
            } else {
                setLoginError("Incorrect Username/Password");
                throw new Error("Login failed.");
            }
        } catch (error) {
          throw error; // Re-throw the error for handling in the calling function.
        }
    };

    const logout = async () => {
        if (token) {
            const url = `${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/token`;
            fetch(url, { method: "delete", credentials: "include" })
                .then(() => {
                setToken(null);
                // Delete old token
                document.cookie =
                    "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                })
                .catch(console.error);
        }
        window.location.href = `${process.env.PUBLIC_URL}/`
    };

    const getAccountData = async () => {
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/token`,
        {credentials: "include"})
        const data = await response.json()
        setAccount(data.account)
        console.log(account)
    };

      // const signUpCredCheck = (signUpCred) => {
  //   const check = []
  //   const specialChar = ["!","@","#","$","%","^","&","*","+","~"]
  //   if (allUsers.some(username => username === signUpCred.username)) {
  //     check.push("Username is already used")
  //   }

  // }

    return (
        <AuthContext.Provider value={{
            signUpError,
            setSignUpError,
            loginError,
            setLoginError,
            getToken,
            token,
            setToken,
            signUpCred,
            setSignUpCred,
            loginCred,
            setLoginCred,
            signup,
            login,
            logout,
            getAccountData,
            account,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
