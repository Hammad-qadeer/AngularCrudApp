import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { UserdataService } from 'src/app/services/userdata.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
   title = 'User Form'

   formGroup!: FormGroup;

  userList:any;
  displayedColumns: string[] = ['name', 'email', 'phone', 'cnic','detail'];

  @ViewChild(MatTable) table!: MatTable<any>;

  openDialog(element: any) {
    this.matDialog.open(DialogComponent, {
      data: element
    })
  }

  ngOnInit(): void {
    this.getUserList();
  }

  validateCnic(cnic: FormControl) {
    // Check if the CNIC value contains repetitive digits
    const hasRepetitiveDigits = /(\d)\1{2,}/.test(cnic.value);
    return hasRepetitiveDigits ? { repetitiveDigits: true } : null;
  }

   constructor(public fb: FormBuilder, private api: UserdataService, private matDialog: MatDialog) {
    this.formGroup = this.fb.group ({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
      cnic: ['',[Validators.required, Validators.pattern(/^\d{9}$|^\d{13}$/), this.validateCnic]],
      image: [null,[Validators.required, Validators.pattern(/\.(jpeg|jpg|png)$/)]]
    })

    this.userList = [];
   }

   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

   getUserList() {
    debugger
    this.api.getUser().subscribe((result: any) => {
      console.log(result)
      this.userList = result;
      this.table.renderRows();
      console.log(JSON.stringify(this.userList))
    })
  }

   uploadFile(event : any) {
   const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
  }
    const file = input.files[0];
    this.formGroup.patchValue({
      image: file,
    });
    this.formGroup.get('avatar')?.updateValueAndValidity();
  }
  submitForm() {
    debugger
    var formData: any = new FormData();
    formData.append('name', this.formGroup.get('name')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('phone', this.formGroup.get('phone')?.value);
    formData.append('cnic', this.formGroup.get('cnic')?.value);
    formData.append('image', this.formGroup.get('image')?.value);
    this.api.postUser(formData)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getUserList();
        },
        error: (error) => console.log(error),
      });
  }
}


