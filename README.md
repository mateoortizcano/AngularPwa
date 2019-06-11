# AngularPwa

```bash
ng new <name> service-worker

ng add @angular/pwa --project <project Name>


--Procurar que las versiones de todas las dependencias @angular sean iguales para no generar problemas al ejecutar
npm install --save @angular/material @angular/cdk @angular/animations
```

```javascript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
...
@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
```

```css
@import "~@angular/material/prebuilt-themes/indigo-pink.css";
```


Agregar firebase al proyecto: (Links de instalación y configuración)

https://github.com/angular/angularfire2
