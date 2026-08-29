import { Injectable } from '@angular/core';
import { PessoaM } from '../models/pessoaModel';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Pessoa {
  private pessoas: PessoaM[] = []

  tamanhoArray() {
    return this.pessoas.length
  }

  adicionarPessoa(pessoa: PessoaM) {
    this.pessoas.push(pessoa)
  }

  listarPessoas() {
    return of(this.pessoas)
  }

  buscarPessoaPorId(id: number) {
    const pessoa = this.pessoas.find((elem) => elem.id == id)

    return of(pessoa)
  }

  editarPessoa(pessoa: PessoaM) {
    const posArray = this.pessoas.findIndex((elem) => elem.id === pessoa.id)

    if (posArray !== -1) {
      this.pessoas[posArray] = pessoa
    }
  }

  excluirPessoa(id: number) {
    this.pessoas = this.pessoas.filter((elem) => elem.id !== id)
  }
  
}
