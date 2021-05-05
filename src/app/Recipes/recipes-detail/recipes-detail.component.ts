import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipesService } from "src/app/shared/recipes.service";
import { ShoopingListService } from "src/app/shared/shopping-list.service";
import { Recipe } from "../recipes.model";

@Component({
  selector: "app-recipes-detail",
  templateUrl: "./recipes-detail.component.html",
  styleUrls: ["./recipes-detail.component.css"],
})
export class RecipesDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingSer: ShoopingListService,
    private recipesSer: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipe = this.recipesSer.getRecipe(this.id);
    });
  }

  onAddShopping() {
    this.shoppingSer.onAddList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipesSer.deleteRecipe(this.id);
    this.router.navigate(["recipes"]);
  }
}
