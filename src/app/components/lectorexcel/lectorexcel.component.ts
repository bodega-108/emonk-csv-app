import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Excel } from '../../models/excel';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';



@Component({
  selector: 'app-lectorexcel',
  templateUrl: './lectorexcel.component.html',
  styleUrls: ['./lectorexcel.component.css']
})
export class LectorexcelComponent implements OnInit {

  public tipoArchivo = 'csv';
  
  // Funcion para exportar CSV
  exportAsConfig: ExportAsConfig = {
    type: `csv`, // the type you want to download
    elementIdOrContent: 'element', // the id of html/table element
  }
// Funcion para exportar Excel

  exportAsConfigExcel: ExportAsConfig = {
    type: `xlsx`, // the type you want to download
    elementIdOrContent: 'element', // the id of html/table element
  }


  public tablaexcel:boolean;
  public cargando:boolean;
  public texto:string;
  public data:string[][];
  public datos:any[];
  public pruebita: any;
  public palabra:string;

  constructor(private exportAsService: ExportAsService) {
    this.datos=[]

   }
/**
 * Funcion que llama a la descarga csv
 */
   download(){
     let fecha = new Date();
     // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig,`csv-emonk-${fecha}` ).subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
   }
/**
 * Funcion que llama a la descarga
 */
downloadExcel(){
  let random = Math.round(Math.random() * 100);
  // download the file using old school javascript method
 this.exportAsService.save(this.exportAsConfigExcel,`excel-emonk-${random}` ).subscribe(() => {
   // save started
 });
 // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
 this.exportAsService.get(this.exportAsConfig).subscribe(content => {
   console.log(content);
 });
}

  ngOnInit() {
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
      console.log(this.data)
     for(let i = 1; i < this.data.length; i++){
       
      /**
       * Variables para recoger data de excel
       */
      let categoria = this.data[i][9];
      let nombre = this.data[i][10];
      let info = new Excel();
      let sku = this.data[i][4];
      let item = this.data[i][4];
      let cola = this.data[i][5];
      let configurableA = this.data[i][8];
      let configurableB = this.data[i][18];
      let contadorConfigurable= 0;
      
  
      if(sku !== null){
        /**
         * Incio de logica para asignacion de cogido
         */
        
        //================================= Validacion para Categoria Home ============================================//
         if(categoria.includes("Home") === true){
          let visibilidad;
          if( configurableA === undefined && configurableB === 'Simple'){
            visibilidad = "Catalog, Search";
            
           }
               
           if( configurableA === undefined && configurableB === "Configurable"){
            visibilidad="Not Visible Individually"    
         }
         if( configurableA === 'Configurable' && configurableB === "Configurable"){
              visibilidad = "Catalog, Search"
         }

          // Logica para productos configurable
       
            this.datos.push([7+"-00000"+sku+"-00"+cola,"Default",categoria,nombre,1,"Taxable Goods",visibilidad])
    
         }
        //=============================Fin Validacion =============================================//
        //================================= Validacion para Categoria Home ============================================//
        if(categoria.includes("Baby") === true){

          this.datos.push(27+"-00000"+sku+"-00"+cola);
          
          // Logica para productos configurable
          // if( configurableA === undefined && configurableB === 'Simple'){
          //   this.datos.push(27+"-0000"+sku+"-00"+1);
          //  }
          //  if( configurableA === undefined && configurableB === "Configurable"){
          //   let resta = sku - i;
          //   console.log("seccion baby "+ 'El valord de sku es' + sku +' el valor de i ='+ i + 'y el resultado es ='+resta);
          //   let variante = resta*-1;
          //   this.datos.push(27+"-0000"+sku+"-00"+variante);            
          //  }
          //  if( configurableA === 'Configurable' && configurableB === "Configurable"){
          //       this.datos.push(27+"-0000"+sku+"-00"+0);
          //  }
         }
        //=============================Fin Validacion =============================================//
        //================================= Validacion para Cleaning============================================//
        if(categoria.includes("Cleaning") === true){
          
          // Logica para productos configurable
          this.datos.push(25+"-00000"+sku+"-00"+cola);
        
          // if( configurableA === undefined && configurableB === 'Simple'){
          //   this.datos.push(25+"-0000"+sku+"-00"+1);
          //  }
          //  if( configurableA === undefined && configurableB === "Configurable"){
          //   let resta = sku - i;
          //   console.log("seccion cleaning"+resta);
          //   let variante = resta*-1;
          //   this.datos.push(25+"-0000"+sku+"-00"+variante);            
          //  }
          //  if( configurableA === 'Configurable' && configurableB === "Configurable"){
          //       this.datos.push(25+"-0000"+sku+"-00"+0);
          //  }
        }

        if(categoria.includes("Sustainable") === true){
          this.datos.push(17+"-00000"+sku+"-00"+cola);
        }
        if(categoria.includes("Laboratory") === true){
          this.datos.push(9+"-00000"+sku+"-00"+cola);
        }
        //=============================Fin Validacion =============================================//
       }
     }
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



