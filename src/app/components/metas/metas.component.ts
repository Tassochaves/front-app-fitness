import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MetaService } from '../../service/meta.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-metas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './metas.component.html',
  styleUrl: './metas.component.scss'
})
export class MetasComponent {
  gridStyle={
    width: '100%',
    textAling: 'center'
  };

  metaForm!: FormGroup;
  metas: any;

  constructor(
    private fb: FormBuilder,
    private messagem: NzMessageService,
    private metaService: MetaService){}

  ngOnInit(): void {
    this.metaForm = this.fb.group({
      descricao: [null, [Validators.required]],
      dataInicio: [null, [Validators.required]],
      dataFim: [null, [Validators.required]]
    })

    this.listarMetas();

  }

  enviaForm(){
    this.metaService.postarMeta(this.metaForm.value).subscribe(res => {
      this.messagem.success("Treino postado com sucesso!", {nzDuration:5000});
      this.metaForm.reset();
      this.listarMetas();
    }, error =>{
      this.messagem.error("Erro ao postar treino!", {nzDuration: 5000});
    })
  }

  listarMetas(){
    this.metaService.listarMetas().subscribe(resultado =>{
      this.metas = resultado;
      console.log(this.metas);
    });
  }
}
