import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../auth/auth.guard";
import { PendingSelectComponent } from "./pending-select/pending-select.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesEditComponent } from "./recipes-edit/recipes-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const recipesRouter: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: PendingSelectComponent,
      },
      {
        path: "new",
        component: RecipesEditComponent,
      },
      {
        path: ":id",
        component: RecipesDetailComponent,
        resolve: [RecipesResolverService],
      },
      {
        path: ":id/edit",
        component: RecipesEditComponent,
        resolve: [RecipesResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRouter)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
