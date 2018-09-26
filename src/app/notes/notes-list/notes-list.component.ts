import { Component } from '@angular/core';

import { NoteService } from '../notes.service';
import { Notes} from '../notes.interface';

@Component({
    selector: 'notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.css'],
    providers: [ NoteService ]
})
export class NotesListComponent {
    displayedColumns = ['title', 'content', 'createdAt', 'updatedAt'];
    dataSource: any;

    constructor(
        private noteService: NoteService
    ) {
        this.getNoteData();
    }

    getNoteData () {        
        this.noteService.getNoteData().subscribe((response) => {
            this.dataSource = response;
        }, (err) => {
            console.log(err);
        });        
    }
}