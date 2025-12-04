import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit {
  item: MenuItem | null = null;
  images: string[] = [];
  currentIndex = 0;
  modalOpen = false;
  fading = false;
  loaded = false;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? Number(idParam) : null;
      if (id !== null) {
        this.loadItem(id);
      }
    });
  }

  loadItem(id: number): void {
    this.menuService.getItemById(id).subscribe({
      next: (resp) => {
        console.log('menu-detail: resposta da API:', resp);

        // Extrai os dados de forma direta e previsível
        const apiResp = resp as any;
        let data: any = null;
        if (apiResp && apiResp.data) {
          data = apiResp.data;
        } else if (apiResp && apiResp.id) {
          data = apiResp;
        }

        console.log('menu-detail: dados extraídos:', data);
        // Usar setTimeout para adiar atribuições que afetam bindings
        // e evitar ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          if (data) {
            this.item = data as MenuItem;
            // imagens opcionais (usar placeholder embutido confiável)
            const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect fill="%23f3f3f3" width="100%25" height="100%25"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial,Helvetica,sans-serif" font-size="36">Imagem%20indispon%C3%ADvel</text></svg>';
            if ((this.item as any).imagens && (this.item as any).imagens.length) {
              this.images = (this.item as any).imagens;
            } else {
              this.images = [placeholder];
            }
          } else {
            this.item = null;
            this.images = [];
          }

          this.currentIndex = 0;
          this.loaded = true;
          // garantir detecção
          try { this.cdr.detectChanges(); } catch(e){}
        }, 0);
      },
      error: (err) => {
        console.error('Erro ao carregar item:', err);
        this.item = null;
        this.loaded = true;
      }
    });
  }


  private changeImage(newIndex: number): void {
    if (newIndex === this.currentIndex) {
      return;
    }
    this.fading = true;
    // Pequeno delay para permitir a animação de fade-out
    setTimeout(() => {
      this.currentIndex = (newIndex + this.images.length) % this.images.length;
      // esperar a imagem aparecer
      setTimeout(() => (this.fading = false), 260);
    }, 60);
  }

  prev(): void {
    this.changeImage(this.currentIndex - 1);
  }

  next(): void {
    this.changeImage(this.currentIndex + 1);
  }

  selectImage(index: number): void {
    this.changeImage(index);
  }

  openModal(index: number): void {
    this.currentIndex = index;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  goBack(): void {
    this.location.back();
  }
}
