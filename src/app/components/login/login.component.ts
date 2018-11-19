import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import {SnackBar} from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import {Page} from "tns-core-modules/ui/page"

const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public input: any;

    public constructor(private router: RouterExtensions, private page: Page) {
        this.input = {
            "email": "",
            "password": ""
        };
        this.page.actionBarHidden = true;
    }

    public ngOnInit() {
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/secure"], {clearHistory: true});
        }
    }

    login() {
        if (this.input.email && this.input.password) {
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.input.email,
                        password: this.input.password
                    }
                })
                .then(
                    function (result: any) {
                        ApplicationSettings.setBoolean("authenticated", true);
                        // this.router.navigate(["/secure"], {clearHistory: true});
                        return JSON.stringify(result);
                    }
                )
                .catch(function (error: any) {
                    (new SnackBar()).simple("Incorrect Credentials!");
                    console.log(error);
                });
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/secure"], {clearHistory: true});
        }
    }

}