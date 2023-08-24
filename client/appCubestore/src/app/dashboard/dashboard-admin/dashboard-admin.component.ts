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
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  datos:any;
  destroy$:Subject<boolean>=new Subject<boolean>();
  currentUser:any;
  cantCompras: number = 0;
  topSellingProducts: any[] = [];
  chartData: number[] = [];
  chartLabels: string[] = [];
  public chart: any;



constructor(
    private cartService: CartService,
    private noti: NotificacionService,
    private gService: GenericService,
    private router: Router,
    private route:ActivatedRoute,
    private auth:AuthenticationService
  ) {
    this.auth.currentUser.subscribe((x)=>(this.currentUser=x));

  }

  ngOnInit(): void {
    this.comprasHoy();
    this.fetchTopSellingProducts();
  }

  comprasHoy(){
    this.gService.list('factura/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.datos = data.filter((factura: any) => {
        const createdAt = new Date(factura.createdAt);
        return createdAt >= today;
      });
      this.cantCompras = this.datos.length;
    });
  }

  fetchTopSellingProducts() {
    this.gService.list('producto/top')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data:any)=>{
        this.topSellingProducts = data;
        this.chartData = this.topSellingProducts.map(producto => producto.salesCount);
        this.chartLabels = this.topSellingProducts.map(producto => producto.nombre);
        this.createChart();
      });
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'polarArea',
      // type: 'doughnut',

      data: {
        labels: this.chartLabels, 
	       datasets: [
          { label: "Vendidos este mes:", data: this.chartData,},
          ]
      },
      options: { aspectRatio:2.5}
    });
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
