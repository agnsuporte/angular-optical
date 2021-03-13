import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../project.model';
import { ProjectService } from '../project.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  title: string;
  dataSource: Project;
  projectForm: FormGroup;

  private flagUpdate = false;

  constructor(
    private router: Router,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log('Url Teste: ', this.activatedRoute.snapshot);
    this.initFormGroup();
    this.title = 'Novo Projeto';

    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.setFormUpdate(id);
      this.title = 'Atualizar Projeto';
    }
  }

  onSubmit(): void {
    if (this.projectForm.status === 'VALID') {
      const form = this.projectForm.value;
      const id = this.flagUpdate ? this.dataSource.id : null;

      this.dataSource = {
        id,
        ...form,
      };

      if (this.flagUpdate) {
        this.updateProject();
      } else {
        this.createProject();
      }
    } else {
      this.util.showMessage('Ops!!! Algo deu errado.', true);
    }
  }

  onReset(): void {
    // this.projectForm.reset();
    this.router.navigate(['/projects']);
  }

  createProject(): void {
    this.projectService.create(this.dataSource).subscribe((project) => {
      this.util.showMessage('Projeto criado com sucesso!');
      this.router.navigate(['/projects']);
    });
  }

  updateProject(): void {
    this.projectService.update(this.dataSource).subscribe(() => {
      this.util.showMessage('Projeto atualizado com sucesso!');
      this.router.navigate(['/projects']);
    });
  }

  private initFormGroup(): void {
    this.projectForm = this.formBuilder.group({
      projectName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      projectCompany: [null, Validators.required],
    });
  }

  private setFormUpdate(id: number): void {
    this.projectService.readById(id).subscribe((project) => {
      this.flagUpdate = true;
      this.dataSource = project;
      this.projectForm.controls.projectName.setValue(project.projectName);
      this.projectForm.controls.projectCompany.setValue(project.projectCompany);
    });
  }
}
