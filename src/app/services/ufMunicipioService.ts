import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UfM } from '../models/ufModel';
import { MunicipioM } from '../models/municipioModel';

@Injectable({
  providedIn: 'root',
})
export class UfMunicipio {

  constructor(private http: HttpClient) {}

  listarUfs(): Observable<UfM[]> {
    const urlApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
    return this.http.get<UfM[]>(urlApi);
  }

  listarMunicipios(uf: string): Observable<MunicipioM[]> {
    const urlApi = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`
    return this.http.get<MunicipioM[]>(urlApi)
  }

  listarMunicipiosIBGE(idUf: number): Observable<MunicipioM[]> {
    const urlApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUf}/municipios`
    return this.http.get<MunicipioM[]>(urlApi)
  }
  
}
