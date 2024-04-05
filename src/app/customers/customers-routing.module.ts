import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';

const routes: Routes = [{ path: '', component: CustomersComponent }];
// Der Pfad ist hier auf eine leere Zeichenfolge festgelegt, da der Pfad 
// in AppRoutingModule bereits auf „customers“ festgelegt ist, sodass sich diese Route 
// im „CustomersRoutingModule“ bereits im Kundenkontext befindet. Jede Route in diesem 
// Routing-Modul ist eine untergeordnete Route.

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // Auf diese Weise weiß Angular, dass die Routenliste nur für die 
  // Bereitstellung zusätzlicher Routen verantwortlich ist und für Funktionsmodule gedacht ist
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
