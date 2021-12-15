import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Notes } from './notes.model'

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  selectedNotes: Notes = new Notes();
  notes: Notes[];
  private baseUrl = "http://localhost:3000/notes";

  constructor(private http: HttpClient) {
    // this.selectedNotes = new Notes();
  }

  ngOnInit(): void {
    console.log('service file ',this.selectedNotes);
  }

  postNote(note: Notes){
    return this.http.post(this.baseUrl, note);
  }

  getNoteList() {
    return this.http.get(this.baseUrl);
  }

  putNote(note: Notes) {
    return this.http.put(this.baseUrl + `/${note._id}`, note);
  }

  deleteNote(_id: string) {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }

  // callNotes(){
  //   console.log('hello notes');
  //   this.selectedNotes.title = "";
  //   console.log(this.selectedNotes);
  // }
}
