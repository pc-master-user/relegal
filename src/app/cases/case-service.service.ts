import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, firstValueFrom } from 'rxjs';
import {Case } from './case';


@Injectable({
  providedIn: 'root'
})
export class CaseServiceService {
  status: string[] = ['CLOSED', 'ACTIVE', 'HOLD'];
    constructor(private http: HttpClient) { }
  legalCaseNames: string[] = [
        "Bamboo Watch", 
        "Black Watch", 
        "Blue Band", 
        "Blue T-Shirt", 
        "Bracelet", 
        "Brown Purse", 
        "Chakra Bracelet",
        "Galaxy Earrings",
        "Game Controller",
        "Gaming Set",
        "Gold Phone Case",
        "Green Earbuds",
        "Green T-Shirt",
        "Grey T-Shirt",
        "Headphones",
        "Light Green T-Shirt",
        "Lime Band",
        "Mini Speakers",
        "Painted Phone Case",
        "Pink Band",
        "Pink Purse",
        "Purple Band",
        "Purple Gemstone Necklace",
        "Purple T-Shirt",
        "Shoes",
        "Sneakers",
        "Teal T-Shirt",
        "Yellow Earbuds",
        "Yoga Mat",
        "Yoga Set",
  ];
     getCasesSmall() {
        return firstValueFrom(this.http.get<any>('./legalCases-small.json'))
        .then(res => <Case[]>res.data)
        .then(data => { return data; });
    }

    getCases() {
        return firstValueFrom(this.http.get<any>('assets/legalCases.json'))
        .then(res => <Case[]>res.data)
        .then(data => { return data; });
    }

    getCasesWithOrdersSmall() {
        return firstValueFrom(this.http.get<any>('./legalCases-orders-small.json'))
        .then(res => <Case[]>res.data)
        .then(data => { return data; });
    }

  generatePrduct(): Case {
        const legalCase: Case =  {
            id: this.generateId(),
            name: this.generateName(),
            description: "Case Description",
            price: this.generatePrice(),
            quantity: this.generateQuantity(),
            category: "Case Category",
            inventoryStatus: this.generateStatus(),
            rating: this.generateRating()
        };

        legalCase.image = legalCase?.name?.toLocaleLowerCase().split(/[ ,]+/).join('-')+".jpg";;
        return legalCase;
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }

    generateName() {
        return this.legalCaseNames[Math.floor(Math.random() * Math.floor(30))];
    }

    generatePrice() {
        return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateQuantity() {
        return Math.floor(Math.random() * Math.floor(75)+1);
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }

    generateRating() {
        return Math.floor(Math.random() * Math.floor(5)+1);
    }
}
