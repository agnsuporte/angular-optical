import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  private flagUpdate = false;

  projectForm = this.formBuilder.group({
    projectName: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(50)]),
    ],
    projectCompany: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private util: UtilService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Url Teste: ', this.activatedRoute.snapshot);

    if (id) {
      this.title = 'Atualizar Projeto';
      this.projectService.readById(id).subscribe((project) => {
        this.dataSource = project;
        this.projectForm.controls.projectName.setValue(
          this.dataSource.projectName
        );
        this.projectForm.controls.projectCompany.setValue(
          this.dataSource.projectCompany
        );
        this.flagUpdate = true;
      });
    } else {
      this.title = 'Novo Projeto';
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

    return null;
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
}
