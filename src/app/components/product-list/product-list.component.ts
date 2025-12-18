import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, CurrencyPipe, NgIf],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: Product[] = [];
  filteredProducts: Product[] = []; 
  currentCategoryId: number | undefined;
  searchMode: boolean | undefined;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    } else{
      this.handleListproduct();
    }   
  }

  handleSearchProducts(){
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword') ?? '';

    this.productService.searchProducts(theKeyword).subscribe(
      (data: Product[]) => {
        this.products = data;
      }
    );
  }

  handleListproduct() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      const id = this.route.snapshot.paramMap.get('id');
      this.currentCategoryId = id ? +id : 1;
    } else {
      this.currentCategoryId = 1;
    }

    this.productService.getproductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data ?? [];
        this.filteredProducts = [...this.products];
      }
    );
  }
}
