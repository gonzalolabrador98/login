import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  recordarme:boolean=false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() { 

    this.usuario=new UsuarioModel();

  }

  onSubmit( form:NgForm ){
    if (form.invalid) {return;}

    Swal.fire ({
      allowOutsideClick: false,
      icon:'info',
      text: 'Espere por favor...'
    })
    
  this.auth.nuevoUsuario( this.usuario )
  .subscribe (resp => {

    Swal.close();
    if (this.recordarme){
      localStorage.setItem('email', this.usuario.email);
    }
    this.router.navigateByUrl('/home');
    console.log(resp);

  }, err =>{

    Swal.fire ({
      icon:'error',
      text: err.error.error.message
    })
    console.log(err.error.error.message);

  })
  }


}
