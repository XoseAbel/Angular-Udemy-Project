import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";

@Injectable({ providedIn: "root" })
export class ShoopingListService {
  // as we move always copies we should advice that array changes into shooping-list
  listChanged = new Subject<Ingredient[]>();
  // edit a selected item
  startedEditing = new Subject<number>();

  private ingredientsList: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  getIngredientsList() {
    return [...this.ingredientsList];
  }
  getIngredient(index: number) {
    return this.ingredientsList[index];
  }

  onAdd(ingredient: Ingredient) {
    this.ingredientsList = [...this.ingredientsList, ingredient];
    this.listChanged.next(this.ingredientsList);
  }

  onAddList(ingredients: Ingredient[]) {
    this.ingredientsList = [...this.ingredientsList, ...ingredients];
    this.listChanged.next(this.ingredientsList);
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredientsList[index] = newIngredient;
    this.listChanged.next(this.ingredientsList);
  }

  deleteIngredient(index: number) {
    this.ingredientsList.splice(index, 1);
    this.listChanged.next(this.ingredientsList);
  }
}
