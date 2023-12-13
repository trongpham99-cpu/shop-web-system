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
  public file: any = null;
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
      this.file = file;
    }
  }

  handleUpdateImageChange(id: any, event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.prodcutService.updateImageProduct(id, file).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  createProduct() {
    // Perform the logic to create the new product, including uploading the image
    // You can send the image file (this.newProduct.product_image) along with other product details
    // Make an API call or perform other actions
    // Reset the form and close the dialog after successful creation
    this.prodcutService.createProduct(this.newProduct, this.file).subscribe((res: any) => {
      window.location.reload();
    })
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
    this.prodcutService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe((res: any) => {
      this.getAllProduct();
      this.resetSelectedProduct();
    })
  }

  resetSelectedProduct = () => {
    this.selectedProduct = null;
  }

  deleteProduct(prodcut: any) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc muốn xóa sản phẩm này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.prodcutService.deleteProduct(prodcut._id).subscribe((res: any) => {
          this.getAllProduct();
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa sản phẩm thành công' });
        })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Xóa sản phẩm thất bại' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Hủy', detail: 'Hủy xóa sản phẩm' });
            break;
        }
      }
    });
  }


}
