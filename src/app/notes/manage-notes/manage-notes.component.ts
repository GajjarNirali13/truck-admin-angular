import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { UIRouterModule, UIRouter } from "@uirouter/angular";

import { NoteService } from '../notes.service';

@Component({
    selector: 'manage-notes',
    templateUrl: './manage-notes.component.html',
    styleUrls: ['./manage-notes.component.css'],
    providers: [ NoteService ]
})

export class ManageNotesComponent {
    noteForm: FormGroup;

    config = {
        "title": {
            required: { name: "content" }
        },
        "content": {
          required: { name: "content" }
        }
    };

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public router: UIRouter,
        public noteService: NoteService
    ){
        this.createForm();
    }

    createForm() {
        this.noteForm = this.fb.group({
            title: ['', Validators.required ],
            content: ['', Validators.required ]
        });

        this.noteForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if(!this.noteForm) { return; }
    }   

    onSubmit(){
        if (!this.noteForm) {
            return;
        } else {
            var sendObj = {
                "title": this.noteForm.controls.title.value,
                "content": this.noteForm.controls.content.value
            }
            this.noteService.addNoteData(sendObj).subscribe((response) => {
                this.router.stateService.go('menu.note-list');
            }, (err) => {
                console.log(err);
            });
        }
    }
}