import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() send = new EventEmitter();
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.send.emit();
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value));
  }
}
