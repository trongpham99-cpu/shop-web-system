import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-management-product',
  templateUrl: './management-product.component.html',
  styleUrls: ['./management-product.component.scss'],
})
export class ManagementProductComponent implements OnInit {

  constructor(
    private prodcutService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  visible = false;
  selectedProduct: any = {};
  ngOnInit(): void {
    this.getAllProduct();
  }

  // ... other properties

  openCreateProductDialog = () => {
    this.createProductDialogVisible = true; // Show the dialog
  }

  createProductDialogVisible: boolean = false;
  newProduct: any = {
    // other product properties
    product_image: null,  // property to store the uploaded image file
  };

  handleImageChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.newProduct.product_image = file;
    }
  }

  createProduct() {
    // Perform the logic to create the new product, including uploading the image
    // You can send the image file (this.newProduct.product_image) along with other product details
    // Make an API call or perform other actions
    // Reset the form and close the dialog after successful creation
    console.log(this.newProduct);
    this.resetCreateProductForm();
  }

  resetCreateProductForm() {
    this.newProduct = {}; // Reset the new product object
    this.createProductDialogVisible = false; // Close the dialog
  }

  public products: any = [];
  getAllProduct = () => {
    this.prodcutService.getAllForAdmin({}).subscribe((res: any) => {
      const { metadata } = res;
      this.products = metadata;
    })
  }

  editProduct = (id: any, product: any) => {
    this.selectedProduct = product;
    this.visible = true; // Show the dialog
  }

  conver = (price: any) => {
    return (price / 23000).toFixed(2);
  }

  updateProduct = () => {

  }

  resetSelectedProduct = () => {
    this.selectedProduct = null;
  }

  deleteProduct(prodcut: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        // this.prodcutService.deleteProduct(id).subscribe((res: any) => {
        //   this.getAllProduct();
        // })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
    });
  }


}
