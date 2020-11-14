import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServicio } from '../servicios/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../modelos/usuario';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    public titulo: string;
    public usuario: Usuario;
    public formLogin: FormGroup;

    constructor(
        private _router: Router,
        private _loginServicio: LoginServicio,
        public _fb: FormBuilder
    ){
        this.usuario = new Usuario(0, 0, 0, '', '', '', '', '', '', '', '', 0, '', 0);
        this.formLogin = this._fb.group({
            identificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            clave: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        });
    }

    public async login() {
        this.usuario = this.formLogin.value;   
        this._loginServicio.login(this.usuario.identificacion, this.usuario.clave);
    }

    public irInicio() {
        this._router.navigate(['/inicio']);
    }

}