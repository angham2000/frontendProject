import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserStoreService {

  private role$ = new BehaviorSubject<string>("");
  private id$ = new BehaviorSubject<number>(0);
    constructor() { }
    public getRoleFromStore(){
      return this.role$.asObservable();  }
      public setRoleForStore(role:string){
        this.role$.next(role);
      }
   
      public getIdFromStore(){
        return  this.id$.asObservable();
        }
        public setIdForStore(Id:number){
          this.id$.next(Id);
        }
}
