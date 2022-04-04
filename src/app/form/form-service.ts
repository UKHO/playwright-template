import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class FormService{
    getExample(): [string, string][] {
        return [['First Name','Ada'], ['Last Name','Lovelace'], ['Email','ada@lovelace.com'], ['Pick one','JavaScript'], ['vehicle2','Car'], ['vehicle3','Boat'], ['Give a colour','#b469c3'], ['Give a date','1836-05-12']];
    }

    model: MyFormData = {Firstname: "", Lastname: "", Email: "", FavLang: "", Vehicles: [], Colour: "", Date: "", HeroPower: ""};
}

export type MyFormData = {
    Firstname: string;
    Lastname: string;
    Email: string;
    FavLang: string;
    Vehicles: string[];
    Colour: string;
    Date: string;
    HeroPower: string;
}
