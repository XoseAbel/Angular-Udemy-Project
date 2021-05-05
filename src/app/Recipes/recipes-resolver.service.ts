import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { RecipesService } from "../shared/recipes.service";
import { Recipe } from "./recipes.model";

@Injectable({ providedIn: "root" })
// resolve allow us to do something before router has loaded
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageSer: DataStorageService,
    private recipeSer: RecipesService
  ) {}

  // anlyze route an load data before show page
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeSer.getRecipes();
    const result = recipes.length ? recipes : this.dataStorageSer.fetchData();

    return result;
  }
}
