import { Component, inject} from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { Observable, map } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; // Importe os operadores do RxJS para manipular as pesquisas

import { FilterPipe } from 'src/app/filter.pipe';


interface Notes {
  descricao: string
};


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
 

})
export class PrincipalComponent {
 
  firebase: Firestore = inject(Firestore);
  tableData: any[] = [];
  tableHeaders?: string[];
  searchTerm: string = '';
  searchText: string = '';
  file: File | null = null;
  loading = false; 
  items: any[] =[]  
  produto: any ;
  produtos: any[] = [];
  pesquisa: string = '';
  resultados$?: Observable<[]>;
  termoDePesquisa: string = '';
  
  produtosGeral: any []= []
  constructor(private serviceFire: ServiceService, private firebaseSw : AngularFirestore) { }
  ngOnInit() {
    const query = this.firebaseSw.collection('PRODUTOS');
    query.get().subscribe((snapshot) => {
      // Verifique se o snapshot não está vazio
      if (snapshot.empty) {
        console.log("Está vazio")
      } else {

        for(let i = 0; i < snapshot.size ; i++){
          this.produto = new Produtos       
          this.produto.cod = snapshot.docs[i].get('COD');
          
          this.produto.categoria = snapshot.docs[i].get('CATEGORIA');
                   
          this.produto.custo = snapshot.docs[i].get('CUSTO');
          
          this.produto.fornecedor = snapshot.docs[i].get('FORNECEDOR');
          
          this.produto.produto = snapshot.docs[i].get('PRODUTO ');  
            
          this.produtos.push(this.produto)
          this.items.push(this.produto)         

        }            
        this.tableData = [        
          // ...this.items.map((item)=> [item.categoria, item.cod, item.produto, item.custo, item.fornecedor])
          ...this.items.filter((item) => {
           // Filtre os dados com base na pesquisa do usuário
            return item.categoria && item.cod && item.produto && item.custo && item.fornecedor && item.produto.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
          })
        ]
           
      }
    });
  }
  
  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }
  matchesSearch() {
    console.log("testeass")
    if(!this.searchText){  
      console.log("!this.searchText")
      return this.tableData
    }else{
      const searchTextLowerCase = this.searchText.toLowerCase(); 
      console.log("elseeee")    
      return this.tableData = this.items.filter(item =>  
        item.produto.toLowerCase().includes(searchTextLowerCase) 
      );
      
    }
   
  }
  filtrarDados() {
    if (this.termoDePesquisa.trim() === '') {
      // Se o termo de pesquisa estiver vazio, exiba todos os dados.
      this.tableData = [
        // this.items.map((item) => [item.categoria, item.cod, item.produto, item.custo, item.fornecedor]);
        ...this.items.filter((item) => {
          // Filtre os dados com base na pesquisa do usuário
           return item.categoria && item.cod && item.produto && item.custo && item.fornecedor && item.produto.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
         })
    ]
      } else {
      // Se houver um termo de pesquisa, filtre os dados com base nele.
      this.tableData = [
        ...this.items.filter((item) =>{
          return (item.categoria && item.categoria.toLowerCase().includes(this.termoDePesquisa.toLowerCase()) ||
        item.cod && item.cod.toString().includes(this.termoDePesquisa)) ||
        item.produto && item.produto.toLowerCase().includes(this.termoDePesquisa.toLowerCase()) ||
        item.custo && item.custo.toString().includes(this.termoDePesquisa) ||
        item.fornecedor && item.fornecedor.toLowerCase().includes(this.termoDePesquisa.toLowerCase())
        })      
      ]
    
  }
}
}
export class Produtos{
  produto: string = '';
  cod: string = '';
  custo: string = '';
  fornecedor: string = '';
  categoria: string = '';

  constructor(){}
}