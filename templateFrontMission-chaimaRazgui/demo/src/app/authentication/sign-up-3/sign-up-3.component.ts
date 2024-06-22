import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
    templateUrl: './sign-up-3.component.html'
})

export class SignUp3Component {
    selectedRole = 'VISITOR'; 
    signForm: FormGroup;
    roles = [
        { label: 'ADMIN', value: 'ADMIN' },
        { label: 'VISITOR', value: 'VISITOR' },
        { label: 'BUYER', value: 'BUYER' },
      ];
  

    updateConfirmValidator(): void {
        Promise.resolve().then(() => this.signForm.controls.checkPassword.updateValueAndValidity());
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.signForm.controls.password.value) {
            return { confirm: true, error: true };
        }
    }

    constructor(private fb: FormBuilder,private auth: AuthenticationService,
        private router:Router) {
    }

    ngOnInit(): void {
        this.signForm = this.fb.group({
            userName         : [ null, [ Validators.required ] ],
            email            : [ null, [ Validators.required ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            agree            : [ false ],
            role: [null, Validators.required]
        });
    }
    onSignup(){
        if (this.signForm.valid){
          console.log(this.signForm.value);
          const {userName, role , email, password} = this.signForm.value;
          this.auth.signUp({userName, role , email, password}).subscribe({
            next:(res)=>{
              this.signForm.reset();
            },
            error:(err)=>{
              console.log(err);
            }
          })
        } 
      }
}    