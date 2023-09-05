import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function ResetPassword() {
    // const [viewPass, setViewPass] = useState(false)
    const {
        signUpError,
        setSignUpError,
        loginError,
        setLoginError,
        token,
        setToken,
        getToken,
        getUsers,
        signUpCred,
        setSignUpCred,
        loginCred,
        setLoginCred,
        signUpCredCheck,
        passwordCon,
        setPasswordCon,
        signup,
        login,
        logout,
        account,
        setAccount,
        getAccountData,
        accountId,
        setAccountId,
        update,
        updateCred,
        setUpdateCred
    } = useContext(AuthContext)

    const {reset_id} = useParams()
    const [passwordReset, setPasswordReset] = useState("")
    const [accountInfo, setAccountInfo] = useState("")

    const getPasswordReset = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/password_resets/${reset_id}/`);
        const resetData = await response.json();
        setPasswordReset(resetData);
        console.log(passwordReset)
    };

    const getAccountInfo = async() =>{
        const response = await fetch(`${process.env.REACT_APP_FASTAPI_SERVICE_API_HOST}/api/accounts/${passwordReset.account_id}/`);
        const accountData = await response.json();
        accountData["password"] = "password"
        setAccountInfo(accountData);
        setAccountId(passwordReset.account_id)
        setUpdateCred(accountData)
        console.log(accountData)
        console.log(accountId)
        console.log(updateCred)
    };

    const Update = async(event) => {
        update(updateCred)
    }

    useEffect(() => {
        getPasswordReset()
        getAccountInfo()
        console.log(passwordReset)
    },[]);

    return (
        <div className="whitespace">
            <button onClick={getPasswordReset}>Password Reset</button>
            <button onClick={getAccountInfo}>Account</button>
            <button onClick={Update}>Update</button>
        </div>
    );
}

export default ResetPassword;
