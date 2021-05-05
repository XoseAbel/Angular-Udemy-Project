import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";

import { ErrorPageComponent } from "./error-page/error-page.component";

const appRoutesList = [
  { path: "", redirectTo: "recipes", pathMatch: "full" },
  //lazy loading below
  {
    path: "recipes",
    loadChildren: () =>
      import("./Recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("./Shopping-list/shopping-list.module").then(
        (m) => m.ShoppingListModule
      ),
  },
  { path: "**", redirectTo: "error" },
  {
    path: "error",
    component: ErrorPageComponent,
    data: { message: "Page not Found!" },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutesList, {
      // improve performance, firs load actual page, after start with the rest os lazy loads
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  // when import this module into main module, him receives routermodule with out configuration
  exports: [RouterModule],
})
export class AppRoutes {}
