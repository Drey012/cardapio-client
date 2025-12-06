import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, ApiResponse } from '../../shared/models/menu-item.model';
import { environment } from '../../../environments/environment';

/**
 * Serviço para consumir a API do Cardápio
 * Responsável por todas as requisições HTTP relacionadas ao menu
 */
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // URL base da API (configurada em environment)
  private apiUrl = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) {
    console.log(`MenuService inicializado com API URL: ${this.apiUrl}`);
  }

  /**
   * Obtém todos os itens do cardápio
   * @returns Observable com lista de itens
   */
  getAllItems(): Observable<ApiResponse<MenuItem[]>> {
    return this.http.get<ApiResponse<MenuItem[]>>(this.apiUrl);
  }

  /**
   * Obtém um item específico pelo ID
   * @param id ID do item
   * @returns Observable com o item
   */
  getItemById(id: number): Observable<ApiResponse<MenuItem>> {
    return this.http.get<ApiResponse<MenuItem>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Filtra itens por categoria
   * @param categoria Nome da categoria
   * @returns Observable com itens da categoria
   */
  getItemsByCategory(categoria: string): Observable<ApiResponse<MenuItem[]>> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.apiUrl}/categoria/${categoria}`);
  }

  /**
   * Busca itens por nome
   * @param nome Termo de busca
   * @returns Observable com itens encontrados
   */
  searchItems(nome: string): Observable<ApiResponse<MenuItem[]>> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.apiUrl}/busca/${nome}`);
  }

  /**
   * Obtém todas as categorias disponíveis
   * @returns Observable com lista de categorias
   */
  getAllCategories(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.apiUrl}/categorias/lista`);
  }
}
