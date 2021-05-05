import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipesService } from "src/app/shared/recipes.service";
import { Recipe } from "../recipes.model";

@Component({
  selector: "app-recipes-edit",
  templateUrl: "./recipes-edit.component.html",
  styleUrls: ["./recipes-edit.component.css"],
})
export class RecipesEditComponent implements OnInit {
  id: number;
  editMode = false;
  editRecipe: Recipe;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeSer: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] ? true : false;
      if (params["id"]) {
        this.editRecipe = this.recipeSer.getRecipe(this.id);
      }
    });
    //Init Form
    this.initForm();
  }

  // method to inicialated our form
  private initForm() {
    let recipeName = this.editMode ? this.editRecipe.name : "";
    let recipeDescription = this.editMode ? this.editRecipe.description : "";
    let recipeImgPath = this.editMode ? this.editRecipe.imagePath : "";
    let recipeIngredients = this.editMode
      ? new FormArray(
          this.editRecipe.ingredients.map(
            (ingredient) =>
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/),
                ]),
              })
          )
        )
      : new FormArray([]);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImgPath, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  // a getter!
  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onDeleteAllIngredients() {
    (<FormArray>this.recipeForm.get("ingredients")).clear();
  }

  onSubmit() {
    this.editMode
      ? this.recipeSer.updateRecipe(this.id, this.recipeForm.value)
      : this.recipeSer.addRecipe(this.recipeForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
