import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { CartService } from 'src/app/share/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAutenticated: boolean;
  currentUser: any;
  constructor(
    private router: Router,
    private authService: AuthenticationService) {      
  }

  ngOnInit(): void {
     //Subscripción a la información del usuario actual
    this.authService.currentUser.subscribe((x)=>(this.currentUser=x));
     //Subscripción al boolean que indica si esta autenticado
     this.authService.isAuthenticated.subscribe((valor)=>(this.isAutenticated=valor));
    
  }
  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['usuario/login']);
  }
  
}
