import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NotesService } from '../shared/notes.service';
import { Notes } from '../shared/notes.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [NotesService]
})
export class NotesComponent implements OnInit {

  constructor(public notesService: NotesService) { }

  ngOnInit(): void {
    console.log(this.notesService.selectedNotes);
    this.refreshNoteList();
    // this.notesService.callNotes();
  }

  onSubmit(form: NgForm){
    if(form.value._id == ""){
      console.log(form.value);
      this.notesService.postNote(form.value).subscribe((res)=>{
        console.log(res);
      })
    }
    else {
      console.log('update');
      this.notesService.putNote(form.value).subscribe((res) => {
        console.log(res)
        this.refreshNoteList();
        // M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshNoteList() {
    this.notesService.getNoteList().subscribe((res) => {
      this.notesService.notes = res as Notes[];
      console.log(this.notesService.notes);
    });
  }
  onEdit(note: Notes){
    this.notesService.selectedNotes = note;
  }
  onDelete(id: string, form: NgForm){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.notesService.deleteNote(id).subscribe((res) => {
        this.refreshNoteList();
        // M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
