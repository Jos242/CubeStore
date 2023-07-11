import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';

@Component({
  selector: 'app-factura-all',
  templateUrl: './factura-all.component.html',
  styleUrls: ['./factura-all.component.css']
})
export class FacturaAllComponent implements AfterViewInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();

  idCliente:any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource= new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['usuario', 'tarjeta', 'fecha' ,'acciones'];

  constructor(private router:Router,
    private route:ActivatedRoute,
    private gService:GenericService) {
      let id=this.route.snapshot.paramMap.get('id');
      if(!isNaN(Number(id))){
        this.idCliente = Number(id);
      } else {
        this.idCliente = 0;
      }
    
  }

  ngAfterViewInit(): void {
    let id = this.idCliente;
    if (id != 0){
      this.listaFacturas(Number(id));
    } else {
      this.listaFacturas("");
    }
   
  }
  listaFacturas(id:any){
    //localhost:3000/factura
    this.gService.get('factura',id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        console.log(data);
        this.datos=data;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;        
      });   
  }
  detalle(id:number){
    this.router.navigate(['/factura',id],
    {
      relativeTo:this.route
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
