"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import { confirmSignIn, fetchAuthSession, signIn } from 'aws-amplify/auth';
import * as utils from "../../utils/utils";
import { CognitoJwtVerifier } from 'aws-jwt-verify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.USER_POOL_ID!,
            userPoolClientId: process.env.USER_POOL_CLIENT_ID!,
            userPoolEndpoint: process.env.USER_POOL_END_POINT!
        }
    }
});

export default function LoginPage() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [userNameErrorMsg, setUserNameErrorMsg] = useState('');
    const [error, setError] = useState('');
    const [isChangePass, setIsChangePass] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPwdErrorMsg, setNewPwdErrorMsg] = useState('');

    /**
     * This method will update the password field
     * @param value is password 
     */
    const updatePasswordField = (value: string) => {
        setPassword(value);
    };

    /**
    * This method will update the password field
    * @param value is password 
    */
    const updateNewPasswordField = (value: string) => {
        setNewPassword(value);
    };


    /**
     * * This method will update the user name field
     * @param {*} value is used name
     */
    const updateEmailField = (value: string) => {
        setUserName(value);
    };

    const signInBtn = async (username: string, password: string) => {
        try {
            const { nextStep } = await signIn({
                username,
                password,
                options: {
                    authFlowType: utils.USER_PASSWORD_AUTH
                }
            });
            console.log(nextStep)
            if (nextStep.signInStep === utils.DONE) {
                currentSession();
            } else if (nextStep.signInStep === utils.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED) {
                setIsChangePass(true);
                setLoading(false);
            }
        } catch (error) {
            console.log('error signing in', error);
            setLoading(false);
            setError("Invalid username and password ");
        }
    }

    async function currentSession() {
        try {
            const { accessToken } = (await fetchAuthSession()).tokens ?? {};
            if (accessToken) {
                localStorage.setItem('isAuthenticated', "yes");
                const user_name: string | null = await decodeAccessToken(accessToken.toString());
                localStorage.setItem('userName', user_name === null ? '' : user_name);
                setTimeout(() => {
                    router.push('/');
                    setLoading(false);
                }, 3000);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const decodeAccessToken = async (token: string) => {
        try {
            const verifier = CognitoJwtVerifier.create({
                userPoolId: process.env.USER_POOL_ID!,
                tokenUse: 'access',
                clientId: process.env.USER_POOL_CLIENT_ID!,
            });
            const { username } = await verifier.verify(token);
            return username;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    }

    /**
     * This method will validate the login credential
     */
    const login = async () => {
        setUserNameErrorMsg('');
        setPasswordErrorMsg('');
        setError('');
        const user = userName !== '';
        const pass = password !== '';
        if (user && pass) {
            setLoading(true);
            signInBtn(userName, password);
        } else {
            checkFieldValidation(!user, !pass);
        }
    }

    const checkFieldValidation = (user: boolean, pass: boolean) => {
        const userMsg = user ? "Please enter username" : '';
        const passMsg = pass ? "Please enter password" : '';
        setUserNameErrorMsg(userMsg);
        setPasswordErrorMsg(passMsg);
    }

    const passwordValidation = (newPass: boolean) => {
        const passMsg = newPass ? "Please enter new password" : '';
        setNewPwdErrorMsg(passMsg);
    }

    const resetPassword = async () => {
        setNewPwdErrorMsg('');
        setError('');
        const newPass = newPassword !== '';
        if (newPass) {
            setLoading(true);
            try {
                const {
                    nextStep
                } = await confirmSignIn({ challengeResponse: newPassword });
                if (nextStep.signInStep === utils.DONE) {
                    currentSession();
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        } else {
            passwordValidation(newPass);
        }
    }

    useEffect(() => {
        currentSession();
    }, [])

    return (
        <>
            <div className="flex w-screen h-screen">
                <div className="flex-1 bg-[url('/login-bg.jpg')] bg-cover bg-center w-screen h-screen">
                    <div className="p-20 h-screen">
                    </div>
                </div>
                <div className="flex-1 w-screen h-screen bg-linear-to-r from-white to-[#DFFFF1]">
                    <div className="flex h-screen w-full justify-center items-center">
                        <div>
                            <div className="text-[22px] text-[#003031]">{isChangePass ? 'Reset your password' : 'Sign in your account'}</div>
                            {isChangePass ? <div>
                                <div>
                                    <input
                                        name="cf_password"
                                        type="password"
                                        placeholder="Set New Password"
                                        className="w-64 mt-[8px] bg-[#ffffff] text-[#565246] border-1 border-[#AED2BE] rounded-[3px] px-[10px] py-[5px] focus:outline-none"
                                        value={newPassword}
                                        onChange={(e) => updateNewPasswordField(e.target.value)}
                                    />
                                </div>
                                {newPwdErrorMsg !== '' && <div className='text-sm text-[#F54029] mt-[5px]'>{newPwdErrorMsg}</div>}
                                <button type="button" style={loading ? { cursor: 'not-allowed' } : { cursor: 'cursor: pointer' }} className="mt-[14px] text-white bg-[#00615F] hover:bg-blue-800 focus:ring-1 focus:ring-[#00615F] font-medium rounded-[3px] text-sm px-8 py-[8px] dark:bg-[#00615F] dark:hover:bg-[#00615F] focus:outline-none dark:focus:ring-[#00615F] flex" onClick={() => resetPassword()} disabled={loading}>
                                    {loading && <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin mr-[10px]"></div>}
                                    {loading ? 'Loading...' : 'Submit'}
                                </button>
                            </div> :
                                <div>
                                    <div>
                                        <input
                                            name="username"
                                            type="text"
                                            placeholder="sre@company.com"
                                            className="w-64 mt-[10px] bg-[#ffffff] text-[#565246] border-1 border-[#AED2BE] rounded-[3px] px-[10px] py-[5px] focus:outline-none"
                                            value={userName}
                                            onChange={(e) => updateEmailField(e.target.value)}
                                        />
                                    </div>
                                    {userNameErrorMsg !== '' && <div className='text-sm text-[#F54029] mt-[5px]'>{userNameErrorMsg}</div>}
                                    <div>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="********"
                                            className="w-64 mt-[8px] bg-[#ffffff] text-[#565246] border-1 border-[#AED2BE] rounded-[3px] px-[10px] py-[5px] focus:outline-none"
                                            value={password}
                                            onChange={(e) => updatePasswordField(e.target.value)}
                                        />
                                    </div>
                                    {passwordErrorMsg !== '' && <div className='text-sm text-[#F54029] mt-[5px]'>{passwordErrorMsg}</div>}
                                    {/* <button type="button" className="mt-[14px] text-white bg-[#00615F] hover:bg-blue-800 focus:ring-1 focus:ring-[#00615F] font-medium rounded-[3px] text-sm px-8 py-[8px] dark:bg-[#00615F] dark:hover:bg-[#00615F] focus:outline-none dark:focus:ring-[#00615F] cursor-pointer" onClick={() => login()}>Login</button> */}
                                    <button type="button" className="mt-[14px] text-white bg-[#00615F] hover:bg-blue-800 focus:ring-1 focus:ring-[#00615F] font-medium rounded-[3px] text-sm px-8 py-[8px] dark:bg-[#00615F] dark:hover:bg-[#00615F] focus:outline-none dark:focus:ring-[#00615F] flex" onClick={() => login()} disabled={loading}>
                                        {loading && <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin mr-[10px]"></div>}
                                        {loading ? 'Loading...' : 'Login'}
                                    </button>
                                </div>
                            }
                            {error !== '' && <div className='text-[14px] warn mt-[10px] text-[#F54029]'>{error}</div>}
                        </div>
                    </div>
                </div>
            </div >
        </>
    )

}