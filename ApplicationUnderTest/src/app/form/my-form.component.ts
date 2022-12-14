import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService, MyFormData } from './form-service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent implements OnInit {

  vehicles = ["bike", "train", "plane"];

  constructor(private formService: FormService, private router: Router) {
    this.model = { Firstname: "", Lastname: "", Email: "", FavLang: "", Vehicles: [], Colour: "", Date: "", HeroPower: "" };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formService.model = this.model;
    this.router.navigate(['/form-results'])
  }

  onCheckboxChange(vehicle: string, isChecked: any) {
    if (isChecked.target.checked) {
      this.model.Vehicles.push(vehicle);
    } else {
      let index = this.model.Vehicles.indexOf(vehicle);
      this.model.Vehicles.splice(index, 1);
    }
  }

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  model: MyFormData;
}
