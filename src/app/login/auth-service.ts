import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    isAuthenticated: boolean = false;


    login(userName: string, password: string) {
        if(userName === "name" && password === "pass")
            this.isAuthenticated = true;
    }
}