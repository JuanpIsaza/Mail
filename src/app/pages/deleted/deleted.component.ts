import { Component, OnInit } from '@angular/core';
import { DeletedService } from 'src/app/services/deleted/deleted.service';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.component.html',
  styleUrls: ['./deleted.component.scss']
})
export class DeletedComponent implements OnInit {
  mails;
  constructor(private deletedServie: DeletedService) {}

  ngOnInit(): void {
    this.mails = this.deletedServie.storedData;
  }
}
