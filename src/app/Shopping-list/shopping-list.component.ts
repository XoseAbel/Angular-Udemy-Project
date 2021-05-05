import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoopingListService } from "../shared/shopping-list.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsList: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingSer: ShoopingListService) {}

  ngOnInit(): void {
    this.ingredientsList = this.shoppingSer.getIngredientsList();
    this.subscription = this.shoppingSer.listChanged.subscribe(
      (list: Ingredient[]) => (this.ingredientsList = list)
    );
  }

  onEditItem(index: number) {
    this.shoppingSer.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
