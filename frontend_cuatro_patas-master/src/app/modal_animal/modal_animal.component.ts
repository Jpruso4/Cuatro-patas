import { Component, Input } from '@angular/core';
import { NgbModalRef, NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { Subscription } from 'rxjs';
import { LoginServicio } from '../servicios/login.service';
import { Mascota } from '../modelos/mascota';

@Component({
  selector: 'modal-animal',
  templateUrl: './modal_animal.component.html',
  styleUrls: ['./modal_animal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ModalAnimal {
  @Input() idMascota: number;
  @Input() nombre: string;
  @Input() edad: string;
  @Input() genero: string;
  @Input() tamanio: string;
  @Input() color: string;
  @Input() personalidad: string;
  @Input() raza: string;
  @Input() urlImagen: string;
  public modal: NgbModalRef;
  public currentUser: Usuario;
  public currentMascota: Mascota;
  private currentUserSubscription: Subscription;
  public mostrarBotonAdoptar: boolean;

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    private _router: Router,
    private _loginServicio: LoginServicio,
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.currentUserSubscription = this._loginServicio.currentUser.subscribe(user => {
      if (user && user.tipoUsuario) {
        this.mostrarBotonAdoptar = true;
      }
  });
  }

  open(content) {
    this.modal = this.modalService.open(content, { size: 'lg' });
  }

  adoptar() {
    this.currentMascota = new Mascota(0,0,this.idMascota,this.nombre, this.raza, this.edad, this.genero, 
      this.tamanio, this.personalidad, this.color, this.urlImagen, 1);
    localStorage.setItem('currentMascota', JSON.stringify(this.currentMascota));
    this._router.navigate(['/crear-adopcion']);
    this.modal.close();
  }

  iniciarSesion() {
    this._router.navigate(['/login']);
    this.modal.close();
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
}