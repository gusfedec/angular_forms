import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent  {

  MoviesData: Array<any> = [
    { name: 'avenger', value: 'Avenger' },
    { name: 'inception', value: 'Inception' },
    { name: 'parasite', value: 'Parasite' },
    { name: 'joker', value: 'Joker' },
    { name: 'shoplifters', value: 'Shoplifters' }
  ];

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.fb.array([
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding',Validators.required  ],
    ], Validators.required ),
    checkArray: this.fb.array([], [Validators.required])
  });

  nuevoFavorito: FormControl = this.fb.control('', Validators.required );

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  
  get checkArray() {
    return this.miFormulario.get('checkArray') as FormArray;
  }

  constructor( private fb: FormBuilder ) { }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors 
            && this.miFormulario.controls[campo].touched;
  }

  checkObligatorio(){
    const errors = this.miFormulario.get('checkArray')?.errors;
    if ( errors?.required ) {
      return 'Email es obligatorio';
    }
    return '';
  }

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }

    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();

  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }
  
  onCheckboxChange(e: any) {
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  guardar() {
    
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    console.log(this.miFormulario.value);
  }

}
