import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../shared/models/menu-item.model';
import { MenuItemCardComponent } from '../../shared/components/menu-item-card/menu-item-card.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { faMoneyBillWave, faQrcode, faSearch } from '@fortawesome/free-solid-svg-icons';

/**
 * Componente para listar e filtrar itens do cardápio
 */
@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MenuItemCardComponent, FontAwesomeModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  animations: [
    trigger('headerExpand', [
      transition(':enter', [
        style({ transform: 'scaleX(0)', opacity: 0, transformOrigin: 'center' }),
        animate('700ms cubic-bezier(.2,.8,.2,1)', style({ transform: 'scaleX(1)', opacity: 1 }))
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(80, [animate('420ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'none' }))])
        ], { optional: true })
      ]),
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(80, [animate('420ms cubic-bezier(.2,.8,.2,1)', style({ opacity: 1, transform: 'none' }))])
        ], { optional: true })
      ])
    ])
  ]
})
export class MenuListComponent implements OnInit {
  // Font Awesome icons
  readonly faMoneyBillWave = faMoneyBillWave;
  readonly faQrcode = faQrcode;
  readonly faSearch = faSearch;

  // Dados
  items: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  categories: string[] = [];

  // Estados
  loading = false;
  error: string | null = null;
  selectedCategory = '';
  searchTerm = '';

  // Detect preference for reduced motion and expose to template
  readonly reduceMotion = typeof window !== 'undefined' && 
    !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  constructor(
    private menuService: MenuService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadCategories();
  }

  /**
   * Carrega todos os itens do cardápio
   */
  loadItems(): void {
    this.loading = true;
    this.error = null;

    this.menuService.getAllItems().subscribe({
      next: (response) => {
        this.items = response.data;
        this.filteredItems = response.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Erro ao carregar itens do cardápio';
        console.error('Erro ao carregar itens:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Carrega todas as categorias disponíveis
   */
  loadCategories(): void {
    this.menuService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar categorias:', err);
      }
    });
  }

  /**
   * Filtra itens por categoria
   */
  filterByCategory(categoria: string): void {
    this.selectedCategory = categoria;
    this.searchTerm = '';

    if (!categoria) {
      this.filteredItems = this.items;
      return;
    }

    this.loading = true;
    this.menuService.getItemsByCategory(categoria).subscribe({
      next: (response) => {
        this.filteredItems = response.data;
        this.error = null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = `Erro ao filtrar por categoria: ${categoria}`;
        console.error('Erro ao filtrar:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Busca itens por nome
   */
  searchByName(): void {
    if (!this.searchTerm.trim()) {
      this.filteredItems = this.items;
      this.selectedCategory = '';
      this.error = null;
      return;
    }

    this.loading = true;
    this.menuService.searchItems(this.searchTerm).subscribe({
      next: (response) => {
        this.filteredItems = response.data;
        this.selectedCategory = '';
        this.error = null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = `Nenhum item encontrado para: "${this.searchTerm}"`;
        this.filteredItems = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Limpa filtros e busca
   */
  clearFilters(): void {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.filteredItems = this.items;
    this.error = null;
  }
}