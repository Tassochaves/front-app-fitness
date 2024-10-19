import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EstatisticaService } from '../../service/estatistica.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dadosEstatistica: any;

  constructor(private estatisticaService: EstatisticaService){}

  ngOnInit(): void {
    this.obterEstatisticas();

  }

  obterEstatisticas(){
    this.estatisticaService.obterEstatisticas().subscribe(resultado =>{
      console.log(resultado);
      this.dadosEstatistica = resultado;
    });
  }
}
