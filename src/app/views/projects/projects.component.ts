import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { Project } from './project.model';
import { ProjectService } from './project.service';
import { TableDataSource } from './project.datasource';
import { UtilService } from 'src/app/shared/services/util.service';
import { DialogConfirmComponent } from 'src/app/components/dialog/dialog.confirm.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Project>;

  dataSource: TableDataSource;
  displayedColumns = [
    'id',
    'projectName',
    'projectCompany',
    'Networks',
    'createdAt',
    'updatedAt',
    'action',
  ];

  constructor(
    private router: Router,
    private util: UtilService,
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingData();
  }

  ngAfterViewInit() {}

  private loadingData(): void {
    this.projectService.read().subscribe(
      (data) => {
        this.dataSource = new TableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      (error) => {

        if(error.token) {
          this.router.navigate(['/login']);
        } else {
          this.util.showMessage('(LOADPROJECTS) Algo deu errado.', true);
          console.log("Ocorreu um ERROR ao tentar listar Projetos.");
        }
      }
    );
  }

  onDelete(id: number): void {
    const data = { title: 'Excluir', texto: 'Confirma exclusão?' };

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      disableClose: true,
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.delete(id).subscribe(() => {
          this.loadingData();
          this.util.showMessage('Registro excluido...');
        });
      }
    });
  }
}
