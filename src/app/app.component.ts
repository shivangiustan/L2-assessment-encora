import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data:any[] = [];
  searchterm:any;
  reactive_form: any;
 constructor(private api:ApiService,private fb: FormBuilder){
  // $("#myModal").modal('show');

 }

 

 ngOnInit(){
   this.create_form()
  let value = this.api.getsession("phonelist");  
  if(value){
    this.data = value;
  }else{
    this.get_phonebook_list()
  }
  
 }

 create_form() {
  this.reactive_form = this.fb.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required]],

  });
  // Validators.pattern("^([6-9][0-9]{9})$")
}

 get_phonebook_list(){
  this.api.getapi("contacts-mock-response/contacts").subscribe((value:any) => {
   this.data = value;
   this.api.setsession("phonelist",this.data)
  })
 }


 delete_from_list(index:any,value:any){   
   
  if (confirm(`Are you sure to delete ${value.firstName} ${value.lastName} - ${value.phone}`) == true) {
    this.data.splice(index,1)
    this.api.setsession("phonelist",this.data)
  } 
 }
 index_value:any;
 edit_from_list(index:any,value:any){   
   this.index_value = index;
  this.reactive_form.patchValue(value);
 }

 onSubmit(){   
   console.log(this.reactive_form.value);
   
  if (!this.reactive_form.valid) {
    alert("Please fill in all the required fields.")
    return;
  }
  this.data[this.index_value].firstName = this.reactive_form.value.firstName;
  this.data[this.index_value].lastName = this.reactive_form.value.lastName;
  this.data[this.index_value].phone = this.reactive_form.value.phone;
  this.api.setsession("phonelist",this.data)
 }
}
