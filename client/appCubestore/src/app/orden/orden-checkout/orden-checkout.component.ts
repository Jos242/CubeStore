
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { UsuarioCreateComponent } from 'src/app/usuario/usuario-create/usuario-create.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-orden-checkout',
  templateUrl: './orden-checkout.component.html',
  styleUrls: ['./orden-checkout.component.css']
})
export class OrdenCheckoutComponent implements OnInit {
  total = 0;
  fecha = Date.now();
  qtyItems = 0;
  currentUser:any;
  tarjetasList: any;
  direccionesList: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  displayedColumns: string[] = ['producto', 'precio', 'cantidad', 'subtotal'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService
  ) {

    this.auth.currentUser.subscribe((x)=>(this.currentUser=x));
    this.listaTarjetas();
    this.listaDirecciones();
  }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(data=>{
     this.dataSource=new MatTableDataSource(data)
    })
    this.total=this.cartService.getTotal()
   }
  
   listaTarjetas() {
    this.listaTarjetas = null;
    this.gService.list('tarjeta/usuario/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.tarjetasList=data;
        console.log(data);
      });
  }

  listaDirecciones() {
    this.listaDirecciones = null;
    this.gService.list('direccion/usuario/'+this.currentUser.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.direccionesList=data;
        console.log(data);
      });
  }

   actualizarCantidad(item: any) {
    this.cartService.addToCart(item);
    this.total=this.cartService.getTotal();
   /*  this.noti.mensaje('Orden',
    'Cantidad actualizada: '+item.cantidad,
    TipoMessage.info) */
  }

  eliminarItem(item: any) {
    this.cartService.removeFromCart(item);
    this.total=this.cartService.getTotal();
    this.noti.mensaje('Orden',
    'Producto eliminado',
    TipoMessage.warning)
  }

  checkout(){
    this.router.navigate(['/orden/checkout'],
    {
      relativeTo:this.route
    })
  }

  registrarOrden(tarjeta, direccion) {
    if(this.cartService.getItems!=null){
       //Obtener los items del carrito de compras
       let itemsCarrito=this.cartService.getItems;
       //Armar la estructura de la tabla intermedia
       //[{'videojuegoId':valor, 'cantidad':valor}]
       let detalles=itemsCarrito.map(
         x=>({
           ['idProducto']:x.idItem,
           ['cantidad']: x.cantidad
         })
       )
       //Datos para el API
       let infoFact={
         'usuario': this.currentUser.user.id,
         'direccion': direccion,
         'tarjeta': tarjeta,
         'createdAt': new Date(this.fecha),
         'productos':detalles,
         'total': this.total,

       }
       this.gService.create('factura',infoFact)
       .subscribe((respuesta:any)=>{
         this.noti.mensaje('Factura',
         'Factura registrada #'+respuesta.id,
         TipoMessage.success)
         this.cartService.deleteCart();
         this.total=this.cartService.getTotal();
         console.log(respuesta)
       })
    }else{
     this.noti.mensaje('Factura',
     'Agregue productos a la orden',
     TipoMessage.warning)
    }
   }
}

