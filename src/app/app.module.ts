import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutes } from "./app.routes";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { Header } from "./Header/header.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { PendingSelectComponent } from "./Recipes/pending-select/pending-select.component";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    Header,
    ErrorPageComponent,
    PendingSelectComponent,
  ],
  // place to import other ngModule inside app main module
  imports: [BrowserModule, HttpClientModule, AppRoutes, SharedModule],
  // services to our ngModule (also by provideIn:root)
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
