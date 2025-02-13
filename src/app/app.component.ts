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
  formStatus: string = '';
  formData: any = {};

  reativeForm: FormGroup;

  ngOnInit(){
      this.reativeForm = new FormGroup({
        firstname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, CustomValidators.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        username: new FormControl(null, Validators.required, CustomValidators.checkUserName),
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


      // this.reativeForm.get('firstname').valueChanges.subscribe((value) => {
      //     console.log(value);
      // })

      // this.reativeForm.valueChanges.subscribe((data) => {
      //   console.log(data);  
      // })

      // this.reativeForm.get('email').statusChanges.subscribe((status) => {
      //   console.log(status);
      // })

      this.reativeForm.statusChanges.subscribe((status) => {
        console.log(status);
        this.formStatus = status;
      })

  }
  
  OnFormSubmitted(){
    this.formData = this.reativeForm.value;
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



  GenerateUsename(){
    let username = '';

    const fName: string = this.reativeForm.get('firstname').value;
    const lName: string = this.reativeForm.get('lastname').value;
    const dob: string = this.reativeForm.get('dob').value;

    if(fName.length >=3){
      username += fName.slice(0,3);
    }else{
      username += fName;
    }

    if(lName.length >=3){
      username += lName.slice(0,3);
    }else{
      username += lName;
    }

    let datetime = new Date(dob);
    username += datetime.getFullYear();

    username = username.toLowerCase();

    this.reativeForm.setValue({
        firstname: this.reativeForm.get('firstname').value,
        lastname: this.reativeForm.get('lastname').value,
        email: this.reativeForm.get('email').value,
        username: username,
        dob: this.reativeForm.get('dob').value,
        gender: this.reativeForm.get('gender').value,
        address: {
          street: this.reativeForm.get('address.street').value,
          country: this.reativeForm.get('address.country').value,
          city: this.reativeForm.get('address.city').value,
          region: this.reativeForm.get('address.region').value,
          postal: this.reativeForm.get('address.postal').value
        },
        skills: this.reativeForm.get('skills').value,
        experience: this.reativeForm.get('experience').value
    });

    // this.reativeForm.get('username').setValue(username);

    this.reativeForm.patchValue({
      username: username
    });

  }
}
