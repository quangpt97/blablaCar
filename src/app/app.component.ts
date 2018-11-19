import { Component,OnInit } from "@angular/core";
const firebase = require("nativescript-plugin-firebase");
import { BackendService } from "./services/backend.service";
const dialogs = require("tns-core-modules/ui/dialogs");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit{
    ngOnInit(): void {
        // firebase
        //     .createUser({
        //         email: 'gogogo@gmail.com',
        //         password: 'gogogo'
        //     })
        //     .then(
        //         function (result: any) {
        //             alert(result);
        //             return JSON.stringify(result);
        //         }
        //     );
        firebase.init({
            /*onPushTokenReceivedCallback: function(token) {
              alert("Firebase push token: " + token);
            },*/
            onMessageReceivedCallback: function(message) {
                dialogs.alert({
                    title: "Push message: " + (message.title !== undefined ? message.title : ""),
                    message: JSON.stringify(message.body),
                    okButtonText: "W00t!"
                });
            },
            //persist should be set to false as otherwise numbers aren't returned during livesync
            persist: false,
            //storageBucket: 'gs://yowwlr.appspot.com',
            onAuthStateChanged: (data: any) => {
                if (data.loggedIn) {
                    BackendService.token = data.user.uid;
                }
                else {
                    BackendService.token = "";
                }
            }
        }).then(
            function (instance) {
                console.log("firebase.init done");
            },
            function (error) {
                console.log("firebase.init error: " + error);
            }
        );
    }

}
