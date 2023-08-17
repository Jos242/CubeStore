import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ApiProvinciasService } from 'src/app/share/api-provincias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

interface Images {
  url: string;
}

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent {
  datos:any;//Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();
  images: Images[] = [];
  currentUser:any;
  isVendedor:boolean;

  constructor(private gService:GenericService,
    private api:ApiProvinciasService,
    private router:Router,
    private route:ActivatedRoute,
    private notificacion: NotificacionService,
    private auth:AuthenticationService
    ){
    this.auth.currentUser.subscribe((x)=>(this.currentUser=x));
    if (this.currentUser != null){
      this.isVendedor = this.currentUser.user.tiposUsuario.some(element => element.tipoUsuario === 'VENDEDOR');
    } else {
      this.isVendedor = false;
    }
    this.listaProductos(); 
    this.getImages();
    this.getPlaces();
  }

  ngOnInit(): void {
    this.mensajes();
  }

  mensajes() {
   let register=false;
   let auth='';
   this.route.queryParams.subscribe((params)=>{
    auth=params['auth'] || '';
    if(auth){
      this.notificacion.mensaje(
        'Usuario',
        'Acceso denegado',
        TipoMessage.warning
      )
    }
   })
   
  }
  
  listaProductos(){
    this.gService.list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
      });
    
  }
  detalle(id:number){
    this.router.navigate(['/producto',id],
    {
      relativeTo:this.route
    })
  }
  update(){
    this.router.navigate(['/producto/all/', this.currentUser.user.id],
    {
      relativeTo:this.route
    })
  }
  create(){
    this.router.navigate(['/producto/create'],
    {
      relativeTo:this.route
    })
  }

  getImages(){
    this.gService.list('images/all')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.images=data;    
      });
  }

  getPlaces() {
    this.api.getProvincias()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
    });
  }
}
