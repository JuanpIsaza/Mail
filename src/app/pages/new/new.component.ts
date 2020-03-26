import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  newForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      asunto: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      // correo: ['', [Validators.required, Validators.email]],
      descripcion: ['', Validators.required],
    });
  }

  get f() {
    return this.newForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.newForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.newForm.value));
  }
}
