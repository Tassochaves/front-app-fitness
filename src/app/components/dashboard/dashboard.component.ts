import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EstatisticaService } from '../../service/estatistica.service';
import { GraficosService } from '../../service/graficos.service';
import { CategoryScale, Chart } from 'chart.js/auto';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dadosEstatistica: any;

  treinos: any;
  atividades: any;

  @ViewChild('graficoDeLinhaTreinos')
  private graficoDeLinhaTreinoRef!: ElementRef;

  @ViewChild('graficoDeLinhaAtividades')
  private graficoDeLinhaAtividadeRef!: ElementRef;

  constructor(private estatisticaService: EstatisticaService, private graficoService: GraficosService){}

  ngOnInit(): void {
    this.obterEstatisticas();
    this.obterDadosGrafico();
  }

  obterEstatisticas(){
    this.estatisticaService.obterEstatisticas().subscribe(resultado =>{
      this.dadosEstatistica = resultado;
    });
  }

  obterDadosGrafico(){
    this.graficoService.listarDadosGrafico().subscribe(resultado => {
      this.treinos = resultado.treinos;
      this.atividades = resultado.atividades;

      if(this.graficoDeLinhaTreinoRef || this.graficoDeLinhaAtividadeRef){
        this.criarGraficoDeLinha();
      }
    });
  }

  criarGraficoDeLinha(){
    const treinoContext = this.graficoDeLinhaTreinoRef.nativeElement.getContext('2d');
    const atividadeContext = this.graficoDeLinhaAtividadeRef.nativeElement.getContext('2d');

    new Chart(treinoContext, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
