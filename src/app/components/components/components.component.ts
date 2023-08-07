import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../services/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { Datos } from '../classes/Clase-datos';
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  constructor(public servicio: ServicioService, private toastr: ToastrService) { }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'fecha', 'actions'];
  dataSource!: Datos[]

  ngOnInit(): void {
    this.getDatos()
  }

 /*  pdf(){      
    this.servicio.pdf().subscribe(pdf=>{
      const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(pdf)
        a.href = objectUrl
        a.download = 'reporte.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
    })
  } */

  pdf(){      
    this.servicio.pdf().subscribe(pdf=> saveAs(pdf, 'venta.pdf'))
  }



  save(): void{    
    this.servicio.save(this.servicio.form.value).subscribe(() =>{
      this.toastr.success('Creado con exito', 'CREADO!', {
        positionClass: 'toast-bottom-full-width'
      })
      this.onClear()
      this.getDatos()
    }, e =>{
      this.toastr.error(e.error.message, 'Error')
    })
  } 

  getDatos(){
    this.servicio.get().subscribe(notas =>{
      this.dataSource=notas
    })
  }

  eliminar(linea:Datos){
    Swal.fire({
      title: `Estas seguro de eliminar el registro ${linea.nombre} ${linea.apellido}?`,
      text: "No seras capaz de revertir esta operacion.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicio.delete(linea.id).subscribe(()=>{
          Swal.fire(
            'Eliminado!',
            'Registro eliminado.',
            'success'
          )
          this.getDatos()
        })
       
      }
    })
  }

  onClear(){
    this.servicio.form.reset()
    Object.keys(this.servicio.form.controls).forEach(key => {
      this.servicio.form.get(key)?.setErrors(null)
    });
  }

  

}
