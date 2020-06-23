import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular11';
  lista = null;
  user = {
    user_id: null,
    user_name: null,
    user_password: null,
    user_real_name: null,
    user_last_name: null,
    user_profile_picture_url: null,
    user_birthday: null
  }
  state = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.listar().subscribe(result => {
      this.lista = null;
      this.lista = result;
    });
  }

  new() {
    this.usersService.new(this.user).subscribe(result => {
      if (result == 'ok') {
        this.limpiar();
        this.getUsers();
      }
    });
  }

  update() {
    this.usersService.update(this.user).subscribe(result => {
      if (result) {
        this.limpiar();
        this.getUsers();
        this.state = 1;
      }
    })
  }

  delete(user_id) {
    if (!confirm("¿Está seguro de eliminar este registro?"))
      return;
    console.log(user_id);
    this.usersService.delete(user_id).subscribe(result => {
      if (result == 'ok') {
        this.getUsers();
      }
    });
  }

  editProfilePicture(user_id) {
    this.state = 2;
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_profile_picture_url: null,
      user_birthday: null
    }
    this.user.user_id = user_id;
  }

  createState() {
    this.state = 1;
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_profile_picture_url: null,
      user_birthday: null
    }
  }

  limpiar() {
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_profile_picture_url: null,
      user_birthday: null
    }
  }
}
