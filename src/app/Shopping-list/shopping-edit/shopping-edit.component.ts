import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoopingListService } from "src/app/shared/shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  indexItemEdit: number;
  itemEdit: Ingredient;

  constructor(private shoppingSer: ShoopingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingSer.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.indexItemEdit = index;
        this.itemEdit = this.shoppingSer.getIngredient(index);
        this.slForm.setValue({
          name: this.itemEdit.name,
          amount: this.itemEdit.amount,
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const amount = form.value.amount;
    this.editMode
      ? this.shoppingSer.updateIngredient(this.indexItemEdit, { name, amount })
      : this.shoppingSer.onAdd({ name, amount });
    form.reset();
    this.editMode = false;
    this.indexItemEdit = null;
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
    this.indexItemEdit = null;
  }

  onDelete() {
    this.shoppingSer.deleteIngredient(this.indexItemEdit);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
