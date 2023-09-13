import { Component, Pipe, PipeTransform } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore'
import * as XLSX from 'xlsx';

interface Notes {
  descricao: string
};


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],

})
export class PrincipalComponent {
 
  tableData!: any[][];
  tableHeaders?: string[];
  searchText: string = '';
  ngOnInit() {
    this.loadXLSXData('assets/PRODUTOS_DOS_FORNECEDORES.xlsx'); // Caminho para o seu arquivo XLSX
  }

  loadXLSXData(filePath: string) {
    fetch(filePath)
      .then(response => response.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        this.tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        this.tableHeaders = this.tableData.shift();
      });
  }

  // Função para filtrar os dados com base na pesquisa
  get filteredTableData() {
    if (!this.searchText) {
      return this.tableData;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return this.tableData.filter(row => {
      return row.some(cell => {
        if (typeof cell === 'string') {
          return cell.toLowerCase().includes(searchTextLower);
        }
        return false;
      });
    });
  }

}
