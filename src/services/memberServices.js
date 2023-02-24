import { auth } from './firebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
/*
* Service file call API
*/
export default class memberServices {

  static signInByFireBase = ({email, password}) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  static registerEmailFirebase = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}