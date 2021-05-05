import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { RecipesService } from "src/app/shared/recipes.service";
import { Recipe } from "../recipes.model";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipesList: Recipe[];
  subscription: Subscription;

  constructor(private recipeSer: RecipesService) {}

  ngOnInit() {
    this.subscription = this.recipeSer.recipesChanged.subscribe(
      (recipes: Recipe[]) => (this.recipesList = recipes)
    );
    this.recipesList = this.recipeSer.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
