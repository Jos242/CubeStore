import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  public imgSrc:string = "assets/images/1.webp";
  idUsuario:any;
  n:any;
  images: Images[] = [];
  finales: Images[] = [];
  past:any;

  constructor(private gService:GenericService,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private httpClient:HttpClient
    ){
    this.listaProductos(); 
    let id=this.route.snapshot.paramMap.get('id');
    if(!isNaN(Number(id))){
      this.idUsuario = Number(id);
    } else {
      this.idUsuario = 0;
    }

    //localhost:3000/videojuego
    this.gService.list('producto/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
      for(let i = 0;i<=data.length; i++){
        this.getImages(i)
        console.log(i);
      }
    });
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

  getImages(id:any){
    this.httpClient.get<any[]>(`http://localhost:3000/images/${id}`).subscribe(
      (res) => {
        console.log()
        this.finales.push(res[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
