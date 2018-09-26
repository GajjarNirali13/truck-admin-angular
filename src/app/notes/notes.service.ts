import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Notes } from './notes.interface';
@Injectable()
export class NoteService {
    constructor(private http: HttpClient) { }

    getNoteData(): Observable<Notes> {
        return this.http.get<Notes>('http://192.168.1.28:3000/api/notes');
    }

    addNoteData(sendObj): Observable<Notes> {
        return this.http.post<Notes>('http://192.168.1.28:3000/api/note', sendObj);
    }
}