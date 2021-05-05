import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../Recipes/recipes.model";
// import { Ingredient } from "./ingredient.model";

@Injectable({ providedIn: "root" })
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  recipesList: Recipe[] = [];
  // recipesList: Recipe[] = [
  //   new Recipe(
  //     "Croque Monsieur",
  //     "A croque monsieur is a hot sandwich made with ham and cheese. The dish originated in French cafés and bars as a quick snack.",
  //     "https://nosolodulces.es/wp-content/uploads/2018/01/nosolodulces-croque-monsieur-pan-molde-casero-gratinado-2.jpg",
  //     [
  //       new Ingredient("Bread", 2),
  //       new Ingredient("Cheese", 4),
  //       new Ingredient("Ham", 6),
  //     ]
  //   ),
  //   new Recipe(
  //     "Veal with plums",
  //     "Tagine with dried plums is undeniably one of the most famous of Morocco's dishes, usually served at family occasions or special events, such as iftar during Ramadan.",
  //     "https://nosolodulces.es/wp-content/uploads/2017/03/nosolodulces-receta-ternera-ciruelas-caramelizadas-marroqui-3.jpg",
  //     [new Ingredient("Veal", 1), new Ingredient("Plums", 10)]
  //   ),
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipesList = recipes;
    this.recipesChanged.next([...this.recipesList]);
  }

  getRecipes() {
    return [...this.recipesList];
  }

  getRecipe(index: number) {
    return this.recipesList[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipesList = [...this.recipesList, recipe];
    this.recipesChanged.next([...this.recipesList]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipesList[index] = newRecipe;
    this.recipesChanged.next([...this.recipesList]);
  }

  deleteRecipe(index: number) {
    this.recipesList.splice(index, 1);
    this.recipesChanged.next([...this.recipesList]);
  }
}
