import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


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

  constructor(private fb: FormBuilder, private messagem: NzMessageService){}

  ngOnInit(): void {
    this.atividadeForm = this.fb.group({
      caloriasQueimada: [null, [Validators.required]],
      passos: [null, [Validators.required]],
      distancia: [null, [Validators.required]],
      data: [null, [Validators.required]],
    })

  }
}
