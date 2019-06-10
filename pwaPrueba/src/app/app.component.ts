import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Prueba PWA con Angular';

  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit(): void {
    // Este método ayuda a que se actualice la versión del service worker de manera automática cuando se realicen actualizaciones
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
}
