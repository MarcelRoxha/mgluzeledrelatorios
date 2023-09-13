import { Component, inject} from '@angular/core';
import { ServiceService } from 'src/app/services/service.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: ServiceService, private route: Router) {
    console.log('chegou no login');
  }

  login() {
    this.authService.login(this.email, this.senha).then(()=>{      
      this.route.navigate(['/principal']);
    }).catch((error)=>{
      alert('algo deu errado!');
    })
  }

}
