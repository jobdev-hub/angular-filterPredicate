import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dados = [
    { id: 1, nome: 'Marcos' },
    { id: 2, nome: 'Fulano' },
    { id: 3, nome: 'Ciclano' },
    { id: 4, nome: 'Beltrano' },
  ];

  columnsToDisplay = ['id', 'nome'];
  dataSource = new MatTableDataSource();

  idFiltro = new FormControl('');
  nomeFiltro = new FormControl('');
  valoresFiltro = { id: '', nome: '' };

  constructor() {
    this.dataSource.data = this.dados;
    this.dataSource.filterPredicate = this.filtrar();
  }

  ngOnInit() {
    this.inicializarFiltro();
  }

  filtrar(): (data: any, filter: string) => boolean {
    let filtrar = function (data, filter): boolean {
      let consulta = JSON.parse(filter);
      return (
        data.nome.toLowerCase().indexOf(consulta.nome) !== -1 &&
        data.id.toString().toLowerCase().indexOf(consulta.id) !== -1
      );
    };
    return filtrar;
  }

  inicializarFiltro() {
    this.idFiltro.valueChanges.subscribe((id) => {
      this.valoresFiltro.id = id;
      this.dataSource.filter = JSON.stringify(this.valoresFiltro);
    });
    this.nomeFiltro.valueChanges.subscribe((nome) => {
      this.valoresFiltro.nome = nome;
      this.dataSource.filter = JSON.stringify(this.valoresFiltro);
    });
  }
}
