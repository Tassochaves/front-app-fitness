import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AtividadeService } from '../../service/atividade.service';


@Component({
  selector: 'app-atividade',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './atividade.component.html',
  styleUrl: './atividade.component.scss'
})
export class AtividadeComponent {
  gridStyle={
    width: '100%',
    textAling: 'center'
  };

  atividadeForm!: FormGroup;
  atividades: any;

  constructor(
    private fb: FormBuilder,
    private messagem: NzMessageService,
    private atividadeService: AtividadeService){}

  ngOnInit(): void {
    this.atividadeForm = this.fb.group({
      caloriasQueimadas: [null, [Validators.required]],
      passos: [null, [Validators.required]],
      distancia: [null, [Validators.required]],
      data: [null, [Validators.required]],
    })

    this.listarTodasAtividades();
  }

  enviarForm(){
    this.atividadeService.postarAtividade(this.atividadeForm.value).subscribe(resultado => {
      this.messagem.success("Atividade postada com sucesso!", {nzDuration: 5000});
      this.atividadeForm.reset();
      this.listarTodasAtividades();
    }, error => {
      this.messagem.error("Erro ao postar atividade!", {nzDuration: 5000});
    })
  }

  listarTodasAtividades(){
    this.atividadeService.listarAtividade().subscribe(resultado => {
      this.atividades = resultado;
      console.log(this.atividades);
    })
  }
}
