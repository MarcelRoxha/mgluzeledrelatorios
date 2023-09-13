import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent {
  
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
