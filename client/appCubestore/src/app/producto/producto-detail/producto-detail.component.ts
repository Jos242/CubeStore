import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/share/authentication.service';
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

  idProducto: number = 0;

  currentUser: any;

  preguntaForm: FormGroup;
  resp: any;
  
  uploadedImages: UploadedImage[] = [];

  constructor( 
    private fb: FormBuilder,
    private gService: GenericService,
    private route:ActivatedRoute,
    private router: Router,
    private auth:AuthenticationService,
    private httpClient:HttpClient
    ){
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.obtenerProducto(Number(id));
        this.fetchUploadedImages(Number(id));
      }

      this.formularioReactive();
  }
  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.route.params.subscribe((params:Params)=>{
      this.idProducto=params['id'];
      if(this.idProducto!=undefined){
        this.auth.currentUser.subscribe((x)=>(this.currentUser=x));
          //Establecer los valores en cada una de las entradas del formulario
          this.preguntaForm.setValue({
            idUsuario:1,
            idProducto:this.idProducto,
            descripcion:""
          })
        }
    });
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

//Crear Formulario
formularioReactive() {
  //[null, Validators.required]
  this.preguntaForm = this.fb.group({
    idUsuario: [null, null],
    idProducto: [null, null],
    descripcion: [null, Validators.required]
  })
}
  enviarPregunta(): void {
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('pregunta',this.preguntaForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.resp=data;
    });
  }

  fetchUploadedImages(id:any) {
    this.httpClient.get<any[]>(`http://localhost:3000/images/${id}`).subscribe(
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

