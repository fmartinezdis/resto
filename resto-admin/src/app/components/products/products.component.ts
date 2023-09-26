import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
    fotoSrc :string ='';
    productForm = this.fb.group (
      {
        name: ['', Validators.required],
        price: ['',Validators.required],
        description: '',
        foto: ['',Validators.required],

      }
    )
    constructor(private fb :FormBuilder, private productsService : ProductsService ) {

    }
  ngOnInit(): void {
    
  }

  save() {
    const product = this.productForm.value
    this.productsService.save(product).subscribe (req => {
        if (JSON.parse(JSON.stringify(req)).message != null) {
          Swal.fire(
            JSON.parse(JSON.stringify(req)).message,
            '',
            'success'
          )
          this.productForm.reset();
        }

    })
  }

  cancel() {
    this.productForm.reset();
    this.productForm.controls['foto'].setValue('');
    this.fotoSrc ="";
  }
  loadImage(){
     this.fotoSrc =this.productForm.controls['foto'].value!
     
  }
}
