import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EstatisticaService } from '../../service/estatistica.service';
import { GraficosService } from '../../service/graficos.service';
import { CategoryScale, Chart } from 'chart.js/auto';
import { DatePipe } from '@angular/common';

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DatePipe]
})
export class DashboardComponent {

  dadosEstatistica: any;

  treinos: any;
  atividades: any;

  @ViewChild('graficoDeLinhaTreinos')
  private graficoDeLinhaTreinoRef!: ElementRef;

  @ViewChild('graficoDeLinhaAtividades')
  private graficoDeLinhaAtividadeRef!: ElementRef;

  constructor(
    private estatisticaService: EstatisticaService,
    private graficoService: GraficosService,
    private datePipe: DatePipe){}

  ngOnInit(): void {
    this.obterEstatisticas();
    this.obterDadosGrafico();
  }

  ngAfterViewInit(): void {
    if(this.treinos && this.atividades){
      this.criarGraficoDeLinha();
    }
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
      type: 'line',
      data: {
        labels: this.treinos.map((dados: {data: any;}) => this.datePipe.transform(dados.data, 'dd/MM')),
        datasets: [
          {
          label: 'Calorias queimadas',
          data: this.treinos.map((dados: {caloriasQueimadas: any;}) => dados.caloriasQueimadas),
          fill: false,
            borderWidth: 1,
            backgroundColor: 'rgba(80, 200, 120, 0.6)',
            borderColor: 'rgba(0, 100, 0, 1)',
        },
        {
          label: 'Duração',
          data: this.treinos.map((dados: {duracao: any;}) => dados.duracao),
          fill: false,
            borderWidth: 1,
            backgroundColor: 'rgba(120, 180, 200, 0.6)',
            borderColor: 'rgba(0, 100, 150, 1)',
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

    new Chart(atividadeContext, {
      type: 'line',
      data: {
        labels: this.atividades.map((dados: {data: any;}) => this.datePipe.transform(dados.data, 'dd/MM')),
        datasets: [
          {
          label: 'Calorias queimadas',
          data: this.atividades.map((dados: {caloriasQueimadas: any;}) => dados.caloriasQueimadas),
          fill: false,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 100, 100, 0.6)',
            borderColor: 'rgba(255, 0, 0, 1)',
        },
        {
          label: 'Passos',
          data: this.atividades.map((dados: {passos: any;}) => dados.passos),
          fill: false,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 180, 120, 0.6)',
            borderColor: 'rgba(255, 100, 0, 1)',
        },
        {
          label: 'Distancia',
          data: this.atividades.map((dados: {distancia: any;}) => dados.distancia),
          fill: false,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 200, 200, 0.6)',
            borderColor: 'rgba(255, 0, 100, 1)',
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
