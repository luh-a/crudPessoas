import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pessoa } from '../../services/pessoaService';
import { PessoaM } from '../../models/pessoaModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-component',
  imports: [FormsModule],
  templateUrl: './lista-component.html',
  styleUrl: './lista-component.css',
})
export class ListaComponent {
  nomeBusca = '';
  todasPessoas: PessoaM[] = [];
  pessoas: PessoaM[] = [];

  constructor(private router: Router, private pessoaService: Pessoa) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.pessoaService.listarPessoas().subscribe(dados => {
      this.todasPessoas = dados;
      this.pesquisar();
    });
  }

  pesquisar(){
    if (this.nomeBusca.trim() === '') {
      this.pessoas = this.todasPessoas;
    } else {
      const nomeBuscaLower = this.nomeBusca.toLowerCase();
      this.pessoas = this.todasPessoas.filter(pessoa =>
        pessoa.nome?.toLowerCase().includes(nomeBuscaLower)
      );
    }
  }

  excluirPessoa(pObjPessoa: PessoaM) {
    if (confirm(`Deseja realmente excluir a pessoa ${pObjPessoa.nome}?`)) {
      this.pessoaService.excluirPessoa(Number(pObjPessoa.id));
      this.carregarPessoas();
    }
  }

  buscarPessoaPorId(pObjPessoa: PessoaM) {
    this.router.navigate(['/cadastro', pObjPessoa.id]);
  }

}
