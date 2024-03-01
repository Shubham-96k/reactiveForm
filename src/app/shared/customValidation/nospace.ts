import { AbstractControl, Validators } from "@angular/forms";



export class NospaceValidator{

    static nospacecontrol(controls : AbstractControl) : Validators | null{
        if(!controls.value){
            return null
        }
        if(controls.value.includes(' ')){
            return {
                nospaceErr : 'space is not allowed'
            }
        }else{
            return null;
        }
    }
}