import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userSelected: boolean = false;
  isLoading: boolean = false;

  userForm = new FormControl('');

  router: Router = inject(Router);
  userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((value) => {
      this.userSelected = true;
    });
  }

  handleLogin(): void {
    if (this.userForm.value) {
      this.userService.setCurrentUser({name: this.userForm.value, permission: 'update'});
      this.router.navigate(['/board']);
    } 
  }
}
