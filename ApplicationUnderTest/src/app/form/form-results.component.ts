import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from './form-service';

@Component({
  selector: 'app-form-results',
  templateUrl: './form-results.component.html',
  styleUrls: ['./form-results.component.scss']
})
export class FormResultsComponent implements OnInit {

  show: boolean;
  results: [string, string][] = [];
  filteredResults: [string, string][] = [];

  constructor(private formService: FormService, private route: ActivatedRoute) {
    this.show = true;
  }

  ngOnInit(): void {
    let isExample: boolean = false;

    this.route.paramMap.subscribe(params => {
      isExample = params.get('isExample') ? true : false;
    });

    if (!isExample) {
      this.results = [];

      if (this.formService.model.Firstname)
        this.results.push(['First Name', this.formService.model.Firstname]);
      if (this.formService.model.Lastname)
        this.results.push(['Last Name', this.formService.model.Lastname]);

      if (this.formService.model.Email)
        this.results.push(['Email', this.formService.model.Email]);
      if (this.formService.model.FavLang)
        this.results.push(['Pick one', this.formService.model.FavLang]);
      if (this.formService.model.Vehicles) {
        for (const vehicle of this.formService.model.Vehicles) {

          this.results.push(['Vehicle', vehicle]);
        }
      }
      if (this.formService.model.Colour)
        this.results.push(['Give a colour', this.formService.model.Colour]);
      if (this.formService.model.Date)
        this.results.push(['Give a date', this.formService.model.Date]);
      if (this.formService.model.HeroPower)
        this.results.push(['Hero Power', this.formService.model.HeroPower]);
    }
    else
      this.results = this.formService.getExample();

    this.filteredResults = this.results;
  }

  private _filter: string = "";
  public get filter(): string {
    return this._filter;
  }
  public set filter(v: string) {
    this._filter = v;
    this.filteredResults = this.results.filter(value => value[0].toLowerCase().includes(this.filter.toLowerCase())
      || value[1].toLowerCase().includes(this.filter.toLowerCase()));
  }

  toggleTable() {
    this.show = !this.show;
  }

}
