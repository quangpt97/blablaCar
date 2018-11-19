import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
// import * as ApplicationSettings from "application-settings";
import {Page} from "tns-core-modules/ui/page"
import * as dialogs from "tns-core-modules/ui/dialogs";
const firebase = require("nativescript-plugin-firebase");
@Component({
    moduleId: module.id,
    selector: "ns-register",
    templateUrl: "register.component.html",
})
export class RegisterComponent {

    public input: any;

    public constructor(private location: Location, private page: Page) {
        this.input = {
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": ""
        };
        this.page.actionBarHidden = true;
    }

    public register() {
        if(this.input.firstname && this.input.lastname && this.input.email && this.input.password) {
            firebase
                .createUser({
                    email: this.input.email,
                    password: this.input.password,
                    name: this.input.firstname+ ' ' + this.input.lastname
                })
                .then(
                    function (result: any) {
                        firebase.updateProfile({
                            displayName: 'Eddy Verbruggen',
                            photoURL: 'http://provider.com/profiles/eddyverbruggen.png'
                        });
                        alert(result);
                        dialogs.alert({
                            title: "User created",
                            message: "userid: " + result.uid,
                            okButtonText: "Nice!"
                        }).then(() => {
                            console.log("Dialog closed!");
                        });
                        return JSON.stringify(result);
                    }
                )
                .catch(onerror => alert(`${onerror}`));
            // ApplicationSettings.setString("account", JSON.stringify(this.input));
            this.location.back();
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

    public goBack() {
        this.location.back();
    }

}