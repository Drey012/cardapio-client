/**
 * Modelo de dados para um item do cardápio
 */
export interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  // URLs das imagens do item (opcional)
  imagens?: string[];
}

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}
