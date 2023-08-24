import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/share/generic.service';
import { CartService, ItemCart } from 'src/app/share/cart.service';
import { NotificacionService, TipoMessage } from 'src/app/share/notification.service';
import { AuthenticationService } from 'src/app/share/authentication.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-vendedor',
  templateUrl: './dashboard-vendedor.component.html',
  styleUrls: ['./dashboard-vendedor.component.css']
})
export class DashboardVendedorComponent implements OnInit{
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  currentUser:any;
  topSellingProduct: any[] = [];
  topComprador: any;
  idUsuario:any;

  constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService
  ) {
    this.auth.currentUser.subscribe((x)=>(this.currentUser=x));
    this.idUsuario=this.currentUser.user.id;
  }

  ngOnInit(): void {
    this.fetchTopSellingProduct();
    this.getTopComprador();
  }

  fetchTopSellingProduct() {
    this.gService.get('producto/top',this.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.topSellingProduct = data;
      });
  }

  getTopComprador() {
    this.gService.get('producto/comprador',this.idUsuario)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.topComprador = data;
        console.log(this.topComprador)
      });
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
