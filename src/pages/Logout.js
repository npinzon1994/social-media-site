import { redirect } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

export async function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem("LOGIN_ID");
    await signOut(auth);
    return redirect('/');

    
}