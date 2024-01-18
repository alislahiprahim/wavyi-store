import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthUiComponent } from "../auth/auth-ui/auth-ui.component";

@Injectable({
    providedIn: 'root'
})

export class AuthModalService {
    constructor(private dialog: MatDialog) { }

    openAuth(type: 'login' | 'register') {
        const modalRef = this.dialog.open(AuthUiComponent)
        modalRef.componentInstance.type = type;
    }

}