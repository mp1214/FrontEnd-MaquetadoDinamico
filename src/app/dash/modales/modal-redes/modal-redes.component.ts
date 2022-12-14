import { Component, OnInit,Input } from '@angular/core';
import { Redes } from 'src/app/model/redes';
import { RedesService } from 'src/app/servicios/redes.service';
import { ImageService } from 'src/app/servicios/image.service';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-redes',
  templateUrl: './modal-redes.component.html',
  styleUrls: ['./modal-redes.component.css']
})
export class ModalRedesComponent implements OnInit {
  redesList: Redes[]=[];
  red:Redes|any=null;
  id:number=0;
  imagen:string="";
  nombre:string="";
  path:string="";
  form: FormGroup|any=null;

  @Input() mje:string=""

  constructor(private redes:RedesService, private imageService:ImageService,private formBuilder:FormBuilder) {
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3),Validators.maxLength(35)]],
      path:['',[Validators.required, Validators.minLength(10),Validators.maxLength(85)]],
      imagen:['',[Validators.required,Validators.minLength(5),Validators.maxLength(55)]],
      
   })
  }
  ngOnInit(): void {
    this.redes.lista().subscribe(data =>{
      this.redesList= data;
      console.log(this.mje)
    })
  }

  get Nombre(){
    return this.form.get("nombre");
  }
  get Path(){
    return this.form.get("path");
  }
  get NombreValid(){
    return this.Nombre.touched && !this.Nombre.valid;
  }

  get PathValid(){
    return this.Path.touched && !this.Path.valid;
  }
  get Imagen(){
    return this.form.get("imagen");
  }
  get ImagenValid(){
    return this.Imagen.touched && !this.Imagen.valid;
  }
  cargarRedes():void{
    this.redes.lista().subscribe(data =>{this.red=data;})
    
  }
  cargarDetalle(id?:number){
    if(id != undefined){
    this.redes.detail(id).subscribe(data=>{
      this.red=data;
    },err=>{
      alert("error al modificar");
    })
  }
  }
  OnCreate():void{
    const habi= new Redes(this.nombre,this.imagen,this.path)
    this.redes.save(habi).subscribe(data=>{
      alert("Red social a??adida");
      this.cargarRedes();
    },err=>{
      alert("Red social a??adida");
    })
    
  }
  
  borrar(id?:number){
  this.showModal(id);
    /*if(id != undefined){
      this.redes.delete(id).subscribe(data =>{
       
        alert("se pudo eliminar satisfactoriamente");
        this.cargarRedes();
      },err =>{
        alert("No se pudo eliminar");
      })
    }*/
  }
  OnUpdate(id?:number):void{
      if(id != undefined){
        this.redes.update(id,this.red).subscribe(data=>{
          alert("Red social modificada"); 
          this.cargarRedes();
      },err =>{
        alert("Red social modificada");
      })
    }
  }
  onEnviar(event:Event){
    event.preventDefault;
    if(this.form.valid){
      this.OnCreate();
    }else{
      this.form.markAllAsTouched(); 
    }
  }
  Limpiar():void{
    this.form.reset();
    }
    showModal(id?:number){
      Swal.fire({
        title: 'realmente quiere eliminar esta red social?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: `Conservar`,
      }).then((result) => {
       
        if (result.isConfirmed) {
          if(id != undefined){
            this.redes.delete(id).subscribe(data =>{
              alert("se pudo eliminar satisfactoriamente");
              this.cargarRedes();
            },err =>{
              alert("No se pudo eliminar");
            })
            this.cargarRedes();
          }
          Swal.fire('Borrado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Los cambios fueron descartados', '', 'info')
        }
      })
    }
}
