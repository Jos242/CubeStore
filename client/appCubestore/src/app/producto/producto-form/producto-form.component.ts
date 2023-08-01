import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  //Titulo
  titleForm: string = 'Crear';
  //Lista de atributos
  atributosList: any;
  //producto a actualizar
  productoInfo: any;
  //Respuesta del API crear/modificar
  respProducto: any;
  //Sí es submit
  submitted = false;
  //Nombre del formulario
  productoForm: FormGroup;
  //id del Videojuego
  idProducto: number = 0;
  //Sí es crear
  isCreate: boolean = true;

  estadoEnumValues = Object.values(estadosEnum);

  constructor(
    private fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.formularioReactive();
    this.listaAtributos();
  }

  ngOnInit(): void {
    //Verificar si se envio un id por parametro para crear formulario para actualizar
    this.activeRouter.params.subscribe((params:Params)=>{
      this.idProducto=params['id'];
      if(this.idProducto!=undefined){
        this.isCreate=false;
        this.titleForm="Actualizar";
         //Obtener videojuego a actualizar del API
         this.gService.get('producto',this.idProducto).pipe(takeUntil(this.destroy$))
         .subscribe((data:any)=>{
          this.productoInfo=data;
          //Establecer los valores en cada una de las entradas del formulario
          this.productoForm.setValue({
            id:this.productoInfo.id,
            idUsuario:this.productoInfo.idUsuario,
            idCategoria:this.productoInfo.idCategoria,
            nombre:this.productoInfo.nombre,
            descripcion:this.productoInfo.descripcion,
            precio:this.productoInfo.precio,
            cantidad:this.productoInfo.cantidad,
            estado:this.productoInfo.estado,
            atributos:this.productoInfo.atributos.map(({id}) => id)
          })
         });
      }

    });
  }
  //Crear Formulario
  formularioReactive() {
    //[null, Validators.required]
    this.productoForm=this.fb.group({
      id:[null,null],
      idUsuario: [null, Validators.required],
      idCategoria: [null, Validators.required],
      nombre:[null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      descripcion: [null, Validators.required],
      precio: [null, Validators.required],
      cantidad: [null, Validators.required],
      estado: [null, Validators.required],
      atributos: [null, Validators.required],
    })
  }
  listaAtributos() {
    this.atributosList = null;
    this.gService
      .list('atributo')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        // console.log(data);
        this.atributosList = data;
      });
  }
  public errorHandling = (control: string, error: string) => {
    return this.productoForm.controls[control].hasError(error);
  };
  //Crear Videojueogo
  crearProducto(): void {
    //Establecer submit verdadero
    this.submitted = true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('atributos').value.map(x=>({['id']: x}))
    //Asignar valor al formulario
    this.productoForm.patchValue({atributos: gFormat});
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.create('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respProducto=data;
      this.router.navigate(['/producto'],{
        queryParams: {create:'true'}
      });
    });
  }
  //Actualizar Videojuego
  actualizarProducto() {
    //Establecer submit verdadero
    this.submitted=true;
    //Verificar validación
    if(this.productoForm.invalid){
      return;
    }
    
    //Obtener id Generos del Formulario y Crear arreglo con {id: value}
    let gFormat:any=this.productoForm.get('atributos').value.map(x=>({['id']: x }));
    //Asignar valor al formulario 
    this.productoForm.patchValue({ generos:gFormat});
    console.log(this.productoForm.value);
    //Accion API create enviando toda la informacion del formulario
    this.gService.update('producto',this.productoForm.value)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      //Obtener respuesta
      this.respProducto=data;
      this.router.navigate(['/producto'],{
        queryParams: {update:'true'}
      });
    });
  }
  onReset() {
    this.submitted = false;
    this.productoForm.reset();
  }
  onBack() {
    this.router.navigate(['/producto']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}

enum estadosEnum {
  NUEVO= 'NUEVO',
  USADO_COMO_NUEVO='USADO_COMO_NUEVO',
  USADO_BUEN_ESTADO='USADO_BUEN_ESTADO',
  USADO_ACEPTABLE='USADO_ACEPTABLE',
}