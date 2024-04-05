import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable<Crisis> } from 'rxjs';

/* An interface that represents your data model */
export interface Crisis {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})


export class CrisisDetailResolverService implements Resolve<Crisis> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
    // your logic goes here
  }
}
