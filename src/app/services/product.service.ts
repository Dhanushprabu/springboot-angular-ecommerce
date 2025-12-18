import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { GetResponseProducts } from '../common/product-response';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { ProductCategory } from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';

  private categoryUrl='http://localhost:8080/api/product-category';
  constructor(private httpclient: HttpClient) { }

  getproductList(theCategoryId: number): Observable<Product[]> {

      //need to create url based on 
      const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

      return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]>{
    
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpclient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpclient.get<GetResponseCatogery>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
    }


}

interface GetResponseProduct{
  _embeded: {
    products: Product[];
  }
}

interface GetResponseCatogery{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
