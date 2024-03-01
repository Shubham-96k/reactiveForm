import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";




export class AsyncEmailValidator{
    static isEmailValid(control : AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
        let val : string = control.value as string;

        const promise = new Promise<ValidationErrors|null>((resolve, reject) => { //by default promise type is unknown
            setTimeout(()=> {
                if(val === 'jhon@gmail.com'){ //this is an mock database api call happened
                    resolve({
                        emailExistErr : 'Email already exist.'
                    })
                }else{
                    resolve(null)
                }
            }, 3000)
        })
        return promise;
    }
}