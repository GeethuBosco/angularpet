import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { PetModel } from './pet-dashboard.model';

@Component({
  selector: 'app-pet-dashboard',
  templateUrl: './pet-dashboard.component.html',
  styleUrls: ['./pet-dashboard.component.css']
})
export class PetDashboardComponent implements OnInit {

  formValue !: FormGroup;
  petModelObj : PetModel = new PetModel();
  petData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder:FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name : [''],
      category :[''],
      breed : [''],
      color : [''],
      age : [''],
      price :['']
    })
    this.getAllPet();

  }

  clickAddPet(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postPetDetails(){
    this.petModelObj.name = this.formValue.value.name;
    this.petModelObj.category = this.formValue.value.category;
    this.petModelObj.breed = this.formValue.value.breed;
    this.petModelObj.color = this.formValue.value.color;
    this.petModelObj.age = this.formValue.value.age;
    this.petModelObj.price = this.formValue.value.price;

    this.api.postPet(this.petModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Pet added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllPet();
    },
    err=>{
      alert("Something went wrong")
    })
  }
  getAllPet(){
    this.api.getPet()
    .subscribe(res=>{
      this.petData = res;

    })
  }
  deletePet(row : any){
    this.api.deletePet(row.id)
    .subscribe(res=>{
      alert("Pet Deleted")
      this.getAllPet();
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.petModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['category'].setValue(row.category);
    this.formValue.controls['breed'].setValue(row.breed);
    this.formValue.controls['color'].setValue(row.color);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['price'].setValue(row.price);
  }
  updatePetDetails(){
    this.petModelObj.name = this.formValue.value.name;
    this.petModelObj.category = this.formValue.value.category;
    this.petModelObj.breed = this.formValue.value.breed;
    this.petModelObj.color = this.formValue.value.color;
    this.petModelObj.age = this.formValue.value.age;
    this.petModelObj.price = this.formValue.value.price;
    this.api.updatePet(this.petModelObj,this.petModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset(); 
      this.getAllPet();
    })
  }

}
