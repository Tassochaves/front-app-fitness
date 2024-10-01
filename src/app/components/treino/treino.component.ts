import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AtividadeService } from '../../service/atividade.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TreinoService } from '../../service/treino.service';

@Component({
  selector: 'app-treino',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './treino.component.html',
  styleUrl: './treino.component.scss'
})
export class TreinoComponent {

  gridStyle={
    width: '100%',
    textAling: 'center'
  };

  treinoForm!: FormGroup;

  tiposDeTreinos: any[] = [
    "Artes marciais",
    "Basquete ",
    "Cardio",
    "Corrida",
    "Ciclismo",
    "Crossfit",
    "Caminhada ",
    "Dança",
    "Desportos aquáticos",
    "Esteira",
    "Futebol",
    "Ginástica",
    "Musculação",
    "Pilates",
    "Treinamento funcional",
    "Yoga"
  ]

  treinos: any;

  constructor(
    private fb: FormBuilder,
    private treinoService: TreinoService,
    private mensagem: NzMessageService){

  }

  ngOnInit(): void {
    this.treinoForm = this.fb.group({
      tipo: [null, [Validators.required]],
      duracao: [null, [Validators.required]],
      data: [null, [Validators.required]],
      caloriasQueimadas: [null, [Validators.required]],
    })

    this.listarTreinos();
  }

  enviarForm(){
    this.treinoService.postarTreino(this.treinoForm.value).subscribe(resultado => {
      this.mensagem.success("Treino postado com sucesso!!", {nzDuration: 5000});
      this.limparForm();
      this.listarTreinos();
    }, error => {
      this.mensagem.error("Erro ao postar treino!!", {nzDuration: 5000});
    });
  }

  limparForm(): void {
    this.treinoForm.reset();
  }

  listarTreinos(){
    this.treinoService.listarTreinos().subscribe(resultado =>{
      this.treinos = resultado;
    });
  }
}
