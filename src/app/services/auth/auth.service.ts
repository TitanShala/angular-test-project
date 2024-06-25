import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user_token: string | null = null

  constructor(private ApiService: ApiService) {
    this.user_token = this.getToken()    
   }

  private setToken = (token:string) => localStorage.setItem('token', token)

  private getToken = () => localStorage.getItem('token')

  isLoggedIn = ()=> this.user_token !== null
  
  login = (email:string, password:string) :Observable<{token:string}> => this.ApiService.post('https://reqres.in/api/login', {email, password},{})

  logout = ()=> {
    this.user_token = null
    localStorage.removeItem('token')
  }

  setUser = (token:string) => {
    this.setToken(token)
    this.user_token = token
    console.log("USER SET: ", this.user_token);
  }

}
