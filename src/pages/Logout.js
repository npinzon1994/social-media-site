import { redirect } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';

export async function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    await signOut(auth);
    return redirect('/');

    
}