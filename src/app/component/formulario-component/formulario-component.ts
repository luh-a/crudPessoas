import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { UfM } from '../../models/ufModel';
import { PessoaM } from '../../models/pessoaModel';
import { Pessoa } from '../../services/pessoaService';
import { ActivatedRoute } from '@angular/router';
import { UfMunicipio } from '../../services/ufMunicipioService';
import { MunicipioM } from '../../models/municipioModel';

@Component({
  selector: 'app-formulario-component',
  imports: [FormsModule],
  templateUrl: './formulario-component.html',
  styleUrl: './formulario-component.css',
})

export class FormularioComponent {
  nome = '';
  email = '';
  cpf = '';
  dataNascimento = '';
  uf = '';
  municipio = '';

  ufs: UfM[] = [];
  municipios: MunicipioM[] = [];

  //armengue
  idPessoaEdit = 0
  edit = false

  constructor(private route: ActivatedRoute, 
    private pessoaService: Pessoa, 
    private ufMunicipioService: UfMunicipio)
  {}

  limparCampos() {
    this.nome = '';
    this.email = '';
    this.cpf = '';
    this.dataNascimento = '';
    this.uf = '';
    this.municipio = '';

    this.ufs = [];
    this.municipios = [];
  }

  carregaCampos(pessoa: PessoaM) {
    this.nome = String(pessoa.nome);
    this.email = String(pessoa.email);
    this.cpf = String(pessoa.cpf);
    this.dataNascimento = String(pessoa.dataNascimento);

    this.uf = pessoa.uf;
    this.municipio = pessoa.municipio;
  }

  ngOnInit() {
    const idPessoa = this.route.snapshot.paramMap.get('id');
    this.idPessoaEdit = Number(idPessoa);

    if (idPessoa) {
      this.edit = true;

      //observable para buscar pessoa por id
      this.pessoaService.buscarPessoaPorId(Number(idPessoa)).subscribe(objPessoa => {
        if (!objPessoa) {
          return;
        }

        this.carregaCampos(objPessoa);

      });
    }
    
    this.carregarUfs()

  }

  save(formPessoa: NgForm) {
    if (formPessoa.invalid) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    const pessoa = new PessoaM();
    pessoa.nome = this.nome;
    pessoa.email = this.email;
    pessoa.cpf = this.cpf;
    pessoa.dataNascimento = this.dataNascimento;
    pessoa.uf = this.uf;
    pessoa.municipio = this.municipio;

    console.log(pessoa.nome, 'UF:', pessoa.uf, 'Cidade:', pessoa.municipio);

    if (this.edit) {
      pessoa.id = this.idPessoaEdit;
      this.pessoaService.editarPessoa(pessoa)
      this.edit = false
    } else {
      pessoa.id = this.pessoaService.gerarProximoId()

      this.pessoaService.adicionarPessoa(pessoa);
    }

    this.limparCampos();

  }

  alterar(pessoa: PessoaM) {
    if (confirm('Deseja realmente alterar a pessoa?')) {
      this.pessoaService.editarPessoa(pessoa);
    }
  }

  carregarUfs(){
    this.ufMunicipioService.listarUfs().subscribe({
      next: (dadosUfs) => {
        this.ufs = [...dadosUfs].sort((a, b) => a.nome.localeCompare(b.nome));

        if (this.edit) {
          this.carregarMunicipios();
        }
      },
      error: (erro) => {
        console.log('Erro ao carregar UFs:', erro);
      }

    })
  }

  carregarMunicipios() {
    //se não houver nada selecionado, limpa municipios
    if (!this.uf) {
      this.municipios = [];
      this.municipio = '';
      return;
    }

    const objUf = this.ufs.find(elem => elem.sigla === this.uf)

    this.ufMunicipioService.listarMunicipiosIBGE(Number(objUf?.id)).subscribe({
      next: (dados) => {
        this.municipios = dados;
      },
      error: (erro) => {
        console.log('Erro ao carregar municípios:', erro);
       this.municipios = [];
      }
    });
  }
}
