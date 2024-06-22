import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserStoreService } from 'src/app/shared/services/user-store.service';


@Component({
    templateUrl: './login-3.component.html'
})

export class Login3Component {
    loginForm : FormGroup = new FormGroup({
        userName: new FormControl(),
        password: new FormControl()
      });

   

    constructor(private fb: FormBuilder,
        private auth: AuthenticationService,
        private userStore:UserStoreService,
        private router:Router) {
    }

    ngOnInit(): void {
     
    }
    onLogin() {
        const data = this.loginForm.value;
        if (this.loginForm.valid) {
          console.log(this.loginForm.value);
          this.auth.login(this.loginForm.value).subscribe({
            next: (res) => {
              localStorage.setItem('token', res.token);
              this.loginForm.reset();
              console.log("Login successful: ", res.message);
              this.auth.storeToken(res.token);
              this.router.navigate(['/dashboard']);
        
            },
            error: (err) => {
              if (err.status === 400 && err.error.code === 3) {
                this.loginForm.reset();
              } else if (err.status === 400 && err.error.code === 1) {
                console.log("Unauthorized"); // Handle unauthorized error
              }
            },
          });
        } else {
          this.validateFormFields(this.loginForm);
        }
      }
      private validateFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateFormFields(control);
          }
        });
      }
}    