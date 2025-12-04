import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';

/**
 * Componente para exibir um item do cardápio em formato de card
 */
@Component({
  selector: 'app-menu-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent {
  @Input() item!: MenuItem;

  /**
   * Retorna um emoji baseado na categoria
   */
  getCategoryEmoji(categoria: string): string {
    const emojiMap: { [key: string]: string } = {
      'Laços': '🎀',
      'Kit': '📦',
      'Sobremesas': '🍰',
      'Acompanhamentos': '🍟'
    };
    return emojiMap[categoria] || '';
  }

  /**
   * Formata o preço para moeda brasileira
   */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  getItemImage(item): string {
    if (this.item.imagens && this.item.imagens.length > 0) {
      return this.item.imagens[0];
    }
    return '';
  }
}
