import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
    template: `
    <input  #name
            class="form-control short-input w-100"
            [disabled]="!cell.isEditable()"
            [placeholder]="cell.getValue()">
  `,
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit {

    constructor() {
        super();
    }

    ngAfterViewInit(): void {
    }

}