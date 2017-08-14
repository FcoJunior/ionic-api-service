import { Operation } from './operation.model';

export class Store {
    id: number;
    cnpj: string;
    enderecoServidor: string;
    nome: string;
    logradouro: string;
    complemento: string;
    numero: string;
    cep: string;
    bairro: string;
    cidade: string;
    uf: string;
    latitude: string;
    longitude: number;
    operation: Operation[];
}