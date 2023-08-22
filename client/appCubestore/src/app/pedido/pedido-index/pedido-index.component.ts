import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.css']
})
export class PedidoIndexComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  idVendedor:any;
  estado:any;
  estadoEnumValues = Object.values(estadosEnum);
  enums = estadosEnum;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['factura', 'nombre', 'cantidad', 'estado', 'subtotal', 'acciones'];

  constructor(private router:Router,
    private noti: NotificacionService,
    private route:ActivatedRoute,
    private gService:GenericService) {
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.idVendedor = Number(id);
      } else {
        this.idVendedor = 0;
      }
      console.log(estadosEnum)

  }

  ngAfterViewInit(): void {
    let id = this.idVendedor;
    if (id != 0){
      this.listaProductos(Number(id));
    } else {
      this.listaProductos("");
    }
   
  }
  listaProductos(id:any){
    //localhost:3000/factura
    this.gService.get('pedido',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.estado = this.enums[data[0].estado]
        console.log(this.estado);
        
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
  }
  compareEnumValues(item1: any, item2: any): boolean {
    return item1 && item2 ? item1 === item2 : false;
  }
  actualizarEstado(row:any, event:any){
    const estado = Object.keys(estadosEnum).find(key => estadosEnum[key] === event);
    row.estado = estado;
    this.gService.update('pedido',row)
    .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
      
      this.gService
      .get('factura',row.idFactura)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        const facturas = data.productos;
        let status = "PENDIENTE";
        
        const pendiente = facturas.some(product => product.estado === "PENDIENTE");
        if(!pendiente){
          const progreso = facturas.some(product => product.estado === "EN_PROGRESO");
          if(progreso){
            status = "EN_PROGRESO";
          } else {
            const entregado = facturas.some(product => product.estado === "ENTREGADO");
            if(entregado){
              status = "ENTREGADO";
            } else{
              const finalizado = facturas.some(product => product.estado === "FINALIZADO");
              if (finalizado){
                status = "FINALIZADO";
              }
            }
          }
        }
        
        data.estado = status;
        this.gService.update('factura',data)
        .pipe(takeUntil(this.destroy$)) .subscribe((data: any) => {
          this.noti.mensaje('Estado',
          'Estado cambiado a ' + this.enums[status],
          TipoMessage.success)
        });
      });
  });
    
    
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

enum estadosEnum {
  PENDIENTE= 'Pendiente',
  EN_PROGRESO= 'En progreso',
  ENTREGADO= 'Entregado',
  FINALIZADO='Finalizado'
}