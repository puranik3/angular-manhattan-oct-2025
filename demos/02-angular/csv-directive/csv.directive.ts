import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { FormValidatorsService } from './form-validators.service';

@Directive({
    selector: '[appCsv]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: CsvDirective,
            multi: true
        }
    ]
})
export class CsvDirective implements Validator {
    @Input( 'appCsv' )
    maxValues : number = 1;

    constructor( private formValidators : FormValidatorsService ) { }

    validate( control : AbstractControl ) : { [key: string]: any } | null {
        return this.formValidators.csv( this.maxValues )( control );
    }
}