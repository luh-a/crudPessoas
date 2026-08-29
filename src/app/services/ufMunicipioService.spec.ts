import { TestBed } from '@angular/core/testing';

import { UfMunicipio } from './ufMunicipioService';

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
