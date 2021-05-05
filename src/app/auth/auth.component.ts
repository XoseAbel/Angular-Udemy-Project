import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert-component/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({ selector: "app-auth", templateUrl: "./auth.component.html" })
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  // generate a new component modal
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authSer: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    // generate const to avoid double code
    let authObs: Observable<AuthResponseData>;

    // asign method to authObs
    authObs = this.isLoginMode
      ? this.authSer.login(email, password)
      : this.authSer.signup(email, password);

    // subscribe first callback success second error
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(["/recipes"]);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        //alternative to show error
        this.showErrorAlert(error);
      }
    );

    form.reset();
  }

  // better aproach to close modal error
  handleCloseModal() {
    this.errorMessage = null;
  }
  // alternative, with create element aproach
  private showErrorAlert(message: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // delete previous elements
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);

    // provite to component data
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  // double check to destroy subcription if user change route, p.ex.
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
