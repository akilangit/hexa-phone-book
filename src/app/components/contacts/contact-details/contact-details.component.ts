import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styles: []
})
export class ContactDetailsComponent implements OnInit {

  contactData: Object;
  updateableContactData: Object;
  contactId: number;

  constructor( private contactService: ContactService,
               private activatedRoute: ActivatedRoute
    ) {
    
    //read url params and get 'contactId' from id as it was specified in app.module routes setup
    this.activatedRoute.params.subscribe(params => {
        this.contactId = params['id'];
        console.log(this.contactId); // Print the parameter to the console. 
    })

  }

  ngOnInit() {
    this.contactService.getContactById(this.contactId)
                       .subscribe( (resp) => {
                          console.log(resp);
                          this.contactData = resp;
                       });
  }

  launchEditModal(){
    //duplicate object 
    this.updateableContactData = JSON.parse(JSON.stringify(this.contactData));

    //launch the modal 
    $('#editModal').modal('show');
  }

  onUpdateHandler(){
    console.log(this.updateableContactData);
    //1. send the data to services
    this.contactService.update(this.updateableContactData)
                        .subscribe((resp)=> {
                          console.log(resp);
                          
                          // TODO: show the message - saved successfully using *ngIf

                          //close the modal
                          setTimeout( () =>{
                            this.contactData = resp;
                            $('#editModal').modal('hide');
                          }, 3000);
                          
                        });
  }

}
