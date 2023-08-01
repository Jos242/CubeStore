import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';

interface UploadedImage {
  url: string;
}

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  uploadedImages: UploadedImage[] = [];

  constructor( private gService: GenericService,
    private route:ActivatedRoute,
    private http:HttpClient
    ){
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerProducto(Number(id));
      }
  }
  obtenerProducto(id:any){
    this.gService
    .get('producto',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
        this.datos=data; 
    });
   
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  
  

  ngOnInit() {
    this.fetchUploadedImages();
  }

  fetchUploadedImages() {
    this.http.get<any[]>('http://localhost:3000/multiplefiles').subscribe(
      (res) => {
        // Assuming the response contains an array of image URLs
        this.uploadedImages = res.map((imageURL: string) => ({ url: imageURL }));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

