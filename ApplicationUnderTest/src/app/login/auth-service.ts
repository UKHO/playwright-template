import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _isAuthenticated: boolean = false;

    constructor() {
       const status = localStorage.getItem('authenticated');
        if(status)
            this.isAuthenticated = true;
    }

    get isAuthenticated(): boolean{
        return this._isAuthenticated;
    }
    private set isAuthenticated(val: boolean){
        this._isAuthenticated = val;
        if(val)
            localStorage.setItem('authenticated', "true");
    }

    login(userName: string, password: string) {
        if(userName === "name" && password === "pass")
            this.isAuthenticated = true;
    }

    logout(): void {
        this.isAuthenticated = false;
    }
}