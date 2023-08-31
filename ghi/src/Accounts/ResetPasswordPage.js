// import { NavLink } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "./context/AuthContext";


// function ResetPassword() {
//     const [viewPass, setViewPass] = useState(false)
//         const {
//         signUpError,
//         setSignUpError,
//         loginError,
//         setLoginError,
//         token,
//         setToken,
//         getToken,
//         getUsers,
//         signUpCred,
//         setSignUpCred,
//         loginCred,
//         setLoginCred,
//         signUpCredCheck,
//         passwordCon,
//         setPasswordCon,
//         signup,
//         login,
//         logout,
//         account,
//         setAccount,
//         getAccountData,
//     } = useContext(AuthContext)



//     useEffect(() => {
//         getAccountData()
//         getToken()
//         getUsers()
//         .then((token) => {
//         if (token) {
//         setToken(token);
//         }
//         })
//     },[]);

//     const Signup = async (event) => {
//         event.preventDefault();
//         const check = await signUpCredCheck(signUpCred)
//         if (check.length === 0) {
//         signup()
//         resetSignUpCred()
//         setPasswordCon("")
//         resetLoginCred()
//         setShowSignUpModal(false)
//         }
//         console(signUpError)
//     };

//     const handleSignUpCredChange = (event) => {
//         setSignUpCred({ ...signUpCred, [event.target.name]: event.target.value });
//         setLoginCred({...loginCred, [event.target.name]: event.target.value})
//     };

//     const handlePasswordConChange = (event) => {
//         setPasswordCon(event.target.value);
//     };

//     const resetSignUpCred = (event) => {
//         setSignUpCred({
//         email: "",
//         username: "",
//         password: "",
//         });
//         setPasswordCon("")
//     };

//     const handleViewPass = (event) => {
//         const pass = document.getElementById("pass");
//         const passConf = document.getElementById("passConf");
//         if (pass.type === "password") {
//         pass.type = "text";
//         setViewPass(true)
//         } else {
//         pass.type = "password";
//         setViewPass(false)
//         }
//         if (passConf.type === "password") {
//         passConf.type = "text";
//         setViewPass(true)
//         } else {
//         passConf.type = "password";
//         setViewPass(false)
//         }
//     };



//     return (
//         <div>
//             <div className="whitespace">
//                 <form onSubmit={Signup} className="medium-modal">
//                     <h2 className="label-center black">Create Account </h2>
//                     <div style={{ margin: "20px 20px 20px 20px"}}>

//                         <h5 className="label black">Email </h5>
//                         <input
//                             className="builder-input"
//                             type="text"
//                             placeholder=" Email"
//                             onChange={handleSignUpCredChange}
//                             name="email"
//                             value={signUpCred.email}>
//                         </input>

//                         <h5 className="label black">Username </h5>
//                         <input
//                             className="builder-input"
//                             type="text"
//                             placeholder=" Username"
//                             onChange={handleSignUpCredChange}
//                             name="username"
//                             value={signUpCred.username}>
//                         </input>

//                         <h5 className="label black">Password </h5>
//                         <input
//                             className="builder-input"
//                             id="pass"
//                             type="password"
//                             placeholder=" Password"
//                             onChange={handleSignUpCredChange}
//                             name="password"
//                             value={signUpCred.password}>
//                         </input>

//                         { !viewPass?
//                             <img
//                                 className="logo2 pointer"
//                                 src="https://i.imgur.com/MfNqq8S.png"
//                                 onClick={handleViewPass}
//                                 title="view password"
//                             />:
//                             <img
//                                 className="logo2 pointer"
//                                 src="https://i.imgur.com/w8oag0B.png"
//                                 onClick={handleViewPass}
//                                 title="hide password"
//                             />
//                         }

//                         <h5 className="label black">Confirm Password </h5>
//                         <input
//                             className="builder-input"
//                             id="passConf"
//                             type="password"
//                             placeholder=" Confirm Password"
//                             onChange={handlePasswordConChange}
//                             value={passwordCon}>
//                         </input>

//                         { !viewPass?
//                             <img
//                                 className="logo2 pointer"
//                                 src="https://i.imgur.com/MfNqq8S.png"
//                                 onClick={handleViewPass}
//                                 title="view password"
//                             />:
//                             <img
//                                 className="logo2 pointer"
//                                 src="https://i.imgur.com/w8oag0B.png"
//                                 onClick={handleViewPass}
//                                 title="hide password"
//                             />
//                         }
//                     </div>
//                     <div style={{margin: "20px 0px 20px 0px"}}>
//                         { signUpError? (
//                             signUpError.map((error) =>
//                             (
//                                 <>
//                                     <p className="error">{error}</p>
//                                 </>
//                             ))): null
//                         }
//                     </div>

//                     <div className="aligned">
//                         <button type="submit">Reset</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ResetPassword;
