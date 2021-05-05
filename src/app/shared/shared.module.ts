import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert-component/alert.component";
import { DropdowDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.module";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinner,
    DropdowDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  // with this module we allow access to the options below
  exports: [
    AlertComponent,
    LoadingSpinner,
    DropdowDirective,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
