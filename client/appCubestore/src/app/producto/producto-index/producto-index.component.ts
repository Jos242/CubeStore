import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface UploadedImage {
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

  idUsuario:any;

  multipleImages = [];

  uploadedImages: UploadedImage[] = [];

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

    this.fetchUploadedImages();
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

  uploadMultiple(event: any) {
    this.multipleImages = event.target.files;
  }

  onMultipleSubmit(event: any){
    event.preventDefault();
    const formData = new FormData();
    for(let img of this.multipleImages){
      formData.append('files', img);
    }
    this.httpClient.post<any>('http://localhost:3000/multiplefiles/2', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  fetchUploadedImages() {
    this.httpClient.get<any[]>(`http://localhost:3000/images/2`).subscribe(
      (res) => {
        this.uploadedImages = res;
        console.log( this.uploadedImages)
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
