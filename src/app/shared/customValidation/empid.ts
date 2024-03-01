import { AbstractControl, ValidationErrors } from "@angular/forms";




export class EmpIdValidator {
    static isEmpValid(controls : AbstractControl): null | ValidationErrors{
        if(!controls.value){
            return null
        }
        let regexp = /^[A-Z]\d{3}$/;

        let isvalid = regexp.test(controls.value);
        if(isvalid){
            return null;
        }else{
            return {
                invalidEmpId : 'EmpId must be starts with one alphabet & ends with 3 digit numbers'
            }
        }
    }
}