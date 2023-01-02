import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  imageUrl!: string;
  formGroup: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  postUser(data: any) {
    return this.http.post<any>("http://localhost:4000/add-user-form", data)
  }

  getUser() {
    return this.http.get<string>("http://localhost:4000/")
  }
}
