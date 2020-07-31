import { Component, OnInit } from '@angular/core';
import { Csv } from '../../models/csv';


@Component({
  selector: 'app-csc-productos', 
  templateUrl: './csc-productos.component.html',
  styleUrls: ['./csc-productos.component.css']
})
export class CscProductosComponent implements OnInit {

  public csvArray:Csv[]= [
    {sku:'Emonk-7-000023-003', tipo:'simple',categoria:'Hogar',nombre:'Sarten Grill Cuadrado', descripcion:'Sarten bañado en ceramica, basta de usar aceite en tus alimentos',descripcionCorta:'Sarten bañado en ceramica',peso:2,color:'Negro',material:'Hierro'}
  ];
  data:[][];

  selectedCsv: Csv = new Csv();
  constructor() { }

  ngOnInit() {
  }
add(){
  console.log(this.selectedCsv);
  this.csvArray.push(this.selectedCsv);
  this.selectedCsv = new Csv();
}



}
