import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Csv } from '../../models/csv';
import { Excel } from '../../models/excel';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';


@Component({
  selector: 'app-lectorexcel',
  templateUrl: './lectorexcel.component.html',
  styleUrls: ['./lectorexcel.component.css']
})
export class LectorexcelComponent implements OnInit {

  

  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementIdOrContent: 'element', // the id of html/table element
  }

  public tablaexcel:boolean;
  public cargando:boolean;
  public texto:string;
  public data:string[][];
  public datos:any[];
  public pruebita: any;
  constructor(private exportAsService: ExportAsService) {
    this.datos=[{sku:"40"}]
  
   }

   download(){
     // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
   }

  ngOnInit() {

    console.log(this.datos)
  }
  onFileChange(evt:any){
    const target : DataTransfer  =  <DataTransfer>(evt.target);
   
    if(target.files.length !== 1) throw new Error("No se permite multiples archivos");
   
    const reader :  FileReader = new FileReader();
   
    reader.onload = (e: any) => {
     
     const bstr: [] = e.target.result;
     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary'});
   
     const wsname : string = wb.SheetNames[0];
     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
   
    
     this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
     for(let i = 1; i < this.data.length; i++){
       
      
      let categoria = this.data[i][2];
      let nombre = this.data[i][1];
      let info = new Excel();
      let sku = this.data[i][0];
      
       if(sku !== null){

        

        if(categoria === 'hogar'){
          this.datos.push(7+"-"+sku);
         }
         if(categoria === 'promocional'){
          this.datos.push(15+"-"+sku);
         }
         if( categoria === 'deporte'){
           this.datos.push(4+"-"+sku);
         }
       }
       

     }
     console.log(this.data);
     console.log(this.datos)
    
    };
    
    reader.readAsBinaryString(target.files[0]);

    this.cargando= true;

    setTimeout(()=>{
      this.cargando=false;
      this.tablaexcel = true;
    },3000)
   
   }

}
