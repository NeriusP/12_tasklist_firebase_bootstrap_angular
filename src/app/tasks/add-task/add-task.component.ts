import { Component, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  inputsNotAvailable: boolean = true;
  @Output() updateTasks = new EventEmitter();
  tN: string;
  tD: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

   activateButton(){
     if(!this.tN || !this.tD || this.tN.trim() == "" || this.tD.trim() == "" ) {
      this.inputsNotAvailable = true;
    } else {
        this.inputsNotAvailable = false
      };
  }

  postTask(taskName, taskDesc){
    const t = {
      pavadinimas: taskName,
      aprasymas: taskDesc,
      statusas: 'laukiama'
    }

    this.http.post('https://tasklist-81bf8-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', t)
    .subscribe((response)=> {
      console.log("post response =", response);
      this.updateTasks.emit("");
    })
    this.tN = '';
    this.tD = "";
    this.inputsNotAvailable = true;
  }

}
