import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { UserdataService } from 'src/app/services/userdata.service';


export interface UserDetail {
  name: string;
  email: string;
  phone: string;
  cnic: string;
}

const ELEMENT_DATA: UserDetail[] = [
  {name: 'name', email: 'test@gmail.com', phone: '11222333444', cnic: '78459554556'},
];

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  userList:any;
  displayedColumns: string[] = ['name', 'email', 'phone', 'cnic','detail'];
  dialog: any;
  constructor(private matDialog : MatDialog, private api : UserdataService) {
    this.userList = [];
  }

  @ViewChild(MatTable) table!: MatTable<any>;

  ngOnInit(): void {
    this.getUserList();
  }

  openDialog() {
    this.matDialog.open(UserTableComponent)
  }

  getUserList() {
    alert('this is called')
    debugger
    this.api.getUser().subscribe((result: any) => {
      console.log(result)
      this.userList = result;
      this.table.renderRows();
      console.log(JSON.stringify(this.userList))
    })
  }
}
