import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [""],
})
export class Header implements OnInit, OnDestroy {
  isAuthenticated = false;
  private subcription: Subscription;

  constructor(
    private dataStorageSer: DataStorageService,
    private authSer: AuthService
  ) {}

  ngOnInit() {
    this.subcription = this.authSer.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  onLogout() {
    this.authSer.logout();
  }

  handleSave() {
    this.dataStorageSer.storeRecipes();
  }

  handleFetch() {
    this.dataStorageSer.fetchData().subscribe();
  }
}
