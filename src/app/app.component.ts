import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-reative-form';

  reativeForm: FormGroup;

  ngOnInit(){
      this.reativeForm = new FormGroup({
        firstname: new FormControl(null),
        lastname: new FormControl(null),
        email: new FormControl(null),
        username: new FormControl(null),
        dob: new FormControl(null),
        gender: new FormControl('male'),
        street: new FormControl(null),
        country: new FormControl('Japan'),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null)
      });
  }
  
  OnFormSubmitted(){
    console.log(this.reativeForm);
  }

}
