import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  statusClass;
  currentId: string;
  tasks = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(){
    this.http.get('https://tasklist-81bf8-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
    .subscribe((response)=>{
      const tempTasks = [];
      for(const key in response){
        tempTasks.push({...response[key], id:key})
      }
      this.tasks = tempTasks;
      console.log("tempTasks", tempTasks);
    })
  }

  deleteTask(id: string){
    this.http
    .delete('https://tasklist-81bf8-default-rtdb.europe-west1.firebasedatabase.app/tasks/'+id+'.json')
    .subscribe((response)=>{
      this.getTasks();
    })
  }

  onUpdate(){
    this.getTasks();
  }

  changeTaskStatus(status, id: string){
    // console.log("naujas statusas :", status.value );
    if(status.value != -1) {
      this.http
      .patch('https://tasklist-81bf8-default-rtdb.europe-west1.firebasedatabase.app/tasks/'+id+'.json', {statusas: status.value})
      .subscribe((response)=>{
        this.getTasks();
        this.statusClass = status.value;
        this.currentId = id;
      })
    }
  }
}
