import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {RouterExtensions} from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import {ItemEventData} from "ui/list-view"
import {BackendService} from "~/app/services/backend.service";
import {FirebaseService} from "~/app/services/firebase.service";
import {ListView} from 'tns-core-modules/ui/list-view';
import {TextField} from 'tns-core-modules/ui/text-field';
import {Observable} from 'rxjs/observable';

const firebaseWebApi = require("nativescript-plugin-firebase/app");
const firebase = require('nativescript-plugin-firebase');

@Component({
    moduleId: module.id,
    selector: "ns-secure",
    templateUrl: "secure.component.html",
    styleUrls: ["secure.component.css"]
})
export class SecureComponent implements OnInit {
    public me: String;

    @ViewChild("list") lv: ElementRef;
    @ViewChild("textfield") tf: ElementRef;

    list: ListView;
    textfield: TextField;

    public constructor(private router: RouterExtensions, private firebaseService: FirebaseService) {
    }

    public chats$: Observable<any>;

    ngOnInit() {
        if (!ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/login"], {clearHistory: true});
        }
        firebase.getCurrentUser()
            .then(function (user: any) {
                ApplicationSettings.setBoolean("authenticated", true);
                // this.router.navigate(["/secure"], {clearHistory: true});
                console.log(user);
                return JSON.stringify(user);
            })
            .catch(error => console.log("Trouble in paradise: " + error));
        this.me = BackendService.token;
        this.chats$ = <any>this.firebaseService.getChats();
        this.firebaseService.getMessage();
        // firebase.getValue('/Chats')
        //     .then(result => console.log(JSON.stringify(result)))
        //     .catch(error => console.log("Error: " + error));
    }
    ngAfterViewInit() {
        this.list = this.lv.nativeElement;
        this.textfield = this.tf.nativeElement;
    }
    logout() {
        ApplicationSettings.remove("authenticated");
        this.router.navigate(["/login"], {clearHistory: true});
        firebase.logout();
    }

    // countries: { name: string, imageSrc: string }[] = [
    //     {name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"},
    //     {name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"},
    //     {name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"},
    //     {name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"},
    //     {name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"},
    //     {name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"},
    //     {name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"},
    //     {name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"},
    //     {name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"},
    //     {name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"},
    //     {name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"},
    //     {name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"},
    //     {name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"},
    //     {name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"},
    //     {name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"},
    //     {name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"},
    //     {name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"},
    // ];
    //
    // onItemTap(args: ItemEventData): void {
    //     console.log('Item with index: ' + args.index + ' tapped');
    // }
    scroll(count:number){
        console.log("scrolling to ", count);
        this.list.scrollToIndex(count-1);
        this.list.refresh();
    }

    chat(message: string) {
        this.firebaseService.chat(message).then((data: any) => {
            let count = this.list.items.length;
            this.scroll(count);
        });
        this.textfield.text = '';
    }

    filter(sender) {
        if (sender == BackendService.token) {
            return "me"
        }
        else {
            return "them"
        }
    }

    align(sender) {
        if (sender == BackendService.token) {
            return "right"
        }
        else {
            return "left"
        }
    }
    showImage(sender) {
        if (sender == BackendService.token) {
            return "collapsed"
        }
        else {
            return "visible"
        }
    }
}