import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './validators/noSpaceAllowed.validator';


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
        firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null),
        dob: new FormControl(null),
        gender: new FormControl('male'),
        address: new FormGroup({
          street: new FormControl(null, Validators.required),
          country: new FormControl('Japan', Validators.required),
          city: new FormControl(null),
          region: new FormControl(null),
          postal: new FormControl(null, Validators.required)
        }),
        skills: new FormArray([
          new FormControl(null, Validators.required)
        ]),
        experience: new FormArray([
          // new FormGroup({
          //   company: new FormControl(null),
          //   position: new FormControl(null),
          //   totalexp: new FormControl(null),
          //   start: new FormControl(null),
          //   end: new FormControl(null)
          // })
        ])
      });
  }
  
  OnFormSubmitted(){
    console.log(this.reativeForm);
  }

  AddSkills(){
   (<FormArray> this.reativeForm.get('skills')).push(new FormControl(null, Validators.required));
  }

  DeleteSkill(index: number){
    const controls = (<FormArray> this.reativeForm.get('skills'));
    controls.removeAt(index);
  }

  AddExperience(){
    const fromGroup =  new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalexp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null)
    });
   (<FormArray> this.reativeForm.get('experience')).push(fromGroup);
  }

  DeleteExperience(index: number){
    const formArray = <FormArray> this.reativeForm.get('experience')
    formArray.removeAt(index);
  }

}
