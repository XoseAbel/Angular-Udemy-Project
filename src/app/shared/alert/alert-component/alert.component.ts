import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"],
})
export class AlertComponent {
  @Input() message: string;
  // easy scenario emit a event and receive into auth when we set message to null
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
