import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Config } from '../../shared/models/config.models';
import { Category } from 'src/app/shared/models/category.model';
import { Merchant } from 'src/app/shared/models/merchant.model';
import { ApplicationStateService, WindowSize } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  configURL = 'https://panjs.com/ywc18.json';
  config: Config;
  merchants: Merchant[];
  filteredCategory: string = 'ทั้งหมด';
  filteredProvince: string;
  filteredPrice: number;
  filteredSubcategory: string = 'ทั้งหมด';
  isMobile: boolean;

  constructor(
    private http: HttpClient,
    private appState: ApplicationStateService
  ) { }

  ngOnInit(): void {
    this.getConfig();
    this.initView();
    this.onResize();
  }

  initView() {
    this.appState.onResize$.subscribe((size: WindowSize) => {
      if (WindowSize.mobile == size) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  getConfig() {
    this.http.get(this.configURL)
      .pipe(
        take(1)
      ).subscribe((data: Config) => {
        this.config = data;
        this.merchants = data.merchants;
      }, (err) => console.log(err));
  }

  onResize() {
    this.appState.onResize();
  }

  getSubcategories() {
    if (this.filteredCategory === 'ทั้งหมด') {
      var allCat: string[] = [];
      this.config.categories.map((cat: Category) => {
        allCat = allCat.concat(cat.subcategories);
      });
      return allCat;
    } else {
      return this.config.categories.find(i => i.name === this.filteredCategory).subcategories;
    }
  }

  getMerchant() {
    let filtered: any = this.filterByProvince().filter((merch: Merchant) => {
      return this.filterByPrice().includes(merch) && this.filterBySubcategory().includes(merch);
    });
    return filtered;
  }

  filterByProvince() {
    if (this.filteredProvince == null) {
      return this.merchants;
    } else {
      let filteredMerchants: Merchant[] = [];
      this.merchants.map((merch: Merchant) => {
        if (merch.addressProvinceName === this.filteredProvince) {
          filteredMerchants = filteredMerchants.concat(merch);
        }
        
      });
      return filteredMerchants;
    }
  }

  filterByPrice() {
    if (this.filteredPrice == null) {
      return this.merchants;
    } else {
      let filteredMerchants: Merchant[] = [];
      this.merchants.map((merch: Merchant) => {
        if (merch.priceLevel - 1 === this.filteredPrice) {
          filteredMerchants = filteredMerchants.concat(merch);
        }
      });
      return filteredMerchants;
    }
  }

  filterBySubcategory() {
    if (this.filteredSubcategory == 'ทั้งหมด') {
      return this.merchants;
    } else {
      let filteredMerchants: Merchant[] = [];
      this.merchants.map((merch: Merchant) => {
        if (merch.subcategoryName === 'สินค้า และ บริการ เกี่ยวกับการตกแต่งบ้าน') {
          merch.subcategoryName = 'สินค้าเกี่ยวกับการตกแต่งบ้าน';
        }
        if (merch.subcategoryName === this.filteredSubcategory) {
          filteredMerchants = filteredMerchants.concat(merch);
        }
      });
      return filteredMerchants;
    }
  }

  resetFilter() {
    this.filteredProvince = null;
    this.filteredPrice = null;
    this.filteredSubcategory = 'ทั้งหมด';
  }

}