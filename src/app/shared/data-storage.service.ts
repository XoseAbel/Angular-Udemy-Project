import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipesService } from "./recipes.service";
import { Recipe } from "../Recipes/recipes.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  url =
    "https://udemy-project-56d50-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
  constructor(
    private http: HttpClient,
    private recipeSer: RecipesService,
    private authSer: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeSer.getRecipes();

    // firabase with put overwrite all data
    // if we need a loading we can subcribe into component by remove subscribe here and return method
    this.http.put(this.url, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchData() {
    return this.http
      .get(
        "https://udemy-project-56d50-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
      )
      .pipe(
        map((recipes: Recipe[]) =>
          recipes.map(({ ingredients, ...rest }) => ({
            ...rest,
            ingredients: ingredients ? ingredients : [],
          }))
        ),
        tap((data) => {
          this.recipeSer.setRecipes(data);
        })
      );
  }
}
