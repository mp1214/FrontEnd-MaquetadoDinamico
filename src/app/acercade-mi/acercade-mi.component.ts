import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../servicios/persona.service';
import { persona } from '../model/persona';

@Component({
  selector: 'app-acercade-mi',
  templateUrl: './acercade-mi.component.html',
  styleUrls: ['./acercade-mi.component.css']
})
export class AcercadeMiComponent implements OnInit {
  AboutMe:persona|any=null;
 
  fotos:persona[]=[];
  img:string="";
  constructor(private acercaDeMi:PersonaService) { }

  ngOnInit(): void {
    this.cargarPersona();
    }
    cargarPersona(){
      this.acercaDeMi.detail(1).subscribe(data=>{
        this.AboutMe=data;
       
      })
    }
  }
 

