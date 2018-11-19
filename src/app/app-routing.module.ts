import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SecureComponent } from "./components/secure/secure.component";
// import {ChatComponent} from "~/app/components/chat/chat.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    // { path: "home", loadChildren: "~/app/home/home.module#HomeModule" }
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "secure", component: SecureComponent },
    // { path: "chat", component: ChatComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
