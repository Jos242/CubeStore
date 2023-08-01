import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent {
  datos:any;//Respuesta del API
  destroy$:Subject<boolean>=new Subject<boolean>();

  idUsuario:any;

  constructor(private gService:GenericService,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute
    ){
    this.listaProductos(); 
    let id=this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.idUsuario = Number(id);
    } else {
      this.idUsuario = 0;
    }
  }
  //Listar los videojuegos llamando al API
  listaProductos(){
    //localhost:3000/videojuego
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
  update(id:number){
    this.router.navigate(['/producto/update/',id],
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
}
