export class Certificado {
    id?: number;
    titulo: string;
    img:string;

    constructor(titulo:string , img:string){
        this.titulo = titulo;
        this.img= img;
    }
}
