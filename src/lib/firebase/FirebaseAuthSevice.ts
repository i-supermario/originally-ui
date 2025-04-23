import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseService } from "./FirebaseService";


export class FirebaseAuthService{

  private static instance: FirebaseAuthService;
  private auth: Auth;

  constructor(){
    const fbService = FirebaseService.getInstance();
    this.auth = getAuth(fbService.getApp());
  }

  static getInstance(): FirebaseAuthService{
    if(!this.instance){
      this.instance = new FirebaseAuthService();
    }

    return this.instance
  }

  async signUpUserWithEmailAndPassword(params: { email: string, password: string }){
    const response = await createUserWithEmailAndPassword(this.auth, params.email, params.password)
    return response.user;

  }

  async loginWithEmailAndPassword(params: { email: string, password: string }){
    const response = await signInWithEmailAndPassword(this.auth, params.email, params.password)
    return response.user;
  }


}