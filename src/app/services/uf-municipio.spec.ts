import { TestBed } from '@angular/core/testing';

import { UfMunicipio } from './uf-municipio';

describe('UfMunicipio', () => {
  let service: UfMunicipio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UfMunicipio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
