import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validationpatt';
import { Icountry } from './shared/model/countryinterface';
import { COUNTRIES_META_DATA } from './shared/const/country';
import { NospaceValidator } from './shared/customValidation/nospace';
import { EmpIdValidator } from './shared/customValidation/empid';
import { AsyncEmailValidator } from './shared/customValidation/asyncEmailValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myproject';

  signupForm !: FormGroup;
  countries : Array<Icountry> = COUNTRIES_META_DATA;

  ngOnInit(): void {
    this.onCreateform();
    this.enableconfirmpass();
    this.curraddvalid();
    this.patchcurraddtopermadd();
    this.onconfirmpassword();
  }

  onconfirmpassword(){
    this.f['confirmpassword'].valueChanges
            .subscribe(res => {
              if(res !== this.f['password'].value){
                this.f['confirmpassword'].setErrors({
                  invalidconfpass : 'password and confirm password must be same.'
                })
              }
            }) 
  }

  patchcurraddtopermadd(){
    this.f['isaddSame'].valueChanges
            .subscribe(res => {
              if(res){
                this.f['permanentaddress'].patchValue(this.f['currentaddress'].value);
                this.f['permanentaddress'].disable()
              }else{
                this.f['permanentaddress'].reset();
                this.f['permanentaddress'].enable();
              }
              
            })
  }

  onCreateform(){
    this.signupForm = new FormGroup({
      username : new FormControl(null, [Validators.required, 
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),
        NospaceValidator.nospacecontrol]),
      email : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], [AsyncEmailValidator.isEmailValid]),
      password : new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmpassword : new FormControl({value: null, disabled: true}, [Validators.required, Validators.pattern(CustomRegex.password)]),
      empid : new FormControl(null, [Validators.required, EmpIdValidator.isEmpValid]),
      gender : new FormControl(null),
      skills : new FormArray([new FormControl(null, [Validators.required])]),
      currentaddress : new FormGroup({
        country : new FormControl(null, [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required]),
      }),
      permanentaddress : new FormGroup({
        country : new FormControl(null, [Validators.required]),
        state : new FormControl(null, [Validators.required]),
        city : new FormControl(null, [Validators.required]),
        zipcode : new FormControl(null, [Validators.required]),
      }),
      isaddSame : new FormControl({value: null, disabled: true})
    })
  }

  get f(){
    return this.signupForm.controls;
  }

  enableconfirmpass(){
    this.f['password'].valueChanges
                    .subscribe(res => {
                      // console.log(res); // returns control value by subscriber in js need to use keyup event to get value
                      // console.log(this.f['password'].valid); // returs true if pass valid and false if invalid
                      if(this.f['password'].valid){
                        this.f['confirmpassword'].enable()
                      }else{
                        this.f['confirmpassword'].disable()
                      }
                    })
  }
  curraddvalid(){
    this.f['currentaddress'].valueChanges.subscribe(res => {
      if(this.f['currentaddress'].valid){
        // this.f['permanentaddress'].get('country')?.enable()
        // this.f['permanentaddress'].enable()
        this.f['isaddSame'].enable()

      }else{
        // this.f['permanentaddress'].get('country')?.disable()
        // this.f['permanentaddress'].disable()
        this.f['isaddSame'].disable()
        this.f['isaddSame'].patchValue(false)
      }
      
    })
  }

  get skillsArray(){
   return this.signupForm.get('skills') as FormArray;
  }// here we get single control but in order to get multiple control like this will increase code size will get directly form array

  get username (){
    return this.signupForm.get('username') as FormControl;
  }

  onSignUp(){
    if(this.signupForm.valid){
      console.log(this.signupForm)
      console.log(this.signupForm.value);
    }
  }

  onAddskill(){
    if(this.skillsArray.length < 5){
      let newcontrol = new FormControl(null, [Validators.required]);
        this.skillsArray.push(newcontrol);
    }
  }

  onRemove(index: number){
    this.skillsArray.removeAt(index);
  }
}
