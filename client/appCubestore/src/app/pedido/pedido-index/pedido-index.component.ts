import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-pedido-index',
  templateUrl: './pedido-index.component.html',
  styleUrls: ['./pedido-index.component.css']
})
export class PedidoIndexComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  idVendedor:any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['factura', 'nombre', 'descripcion', 'cantidad' ,'subtotal'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.idVendedor = Number(id);
      } else {
        this.idVendedor = 0;
      }

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
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
