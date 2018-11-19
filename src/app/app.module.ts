import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {SecureComponent} from "~/app/components/secure/secure.component";
import {RegisterComponent} from "~/app/components/register/register.component";
// import {ChatComponent} from "~/app/components/chat/chat.component";
import {BackendService } from "~/app/services/backend.service";
import {FirebaseService } from "~/app/services/firebase.service";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        SecureComponent,
        // ChatComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        BackendService,
        FirebaseService
    ]
})
export class AppModule {
}
