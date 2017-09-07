import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from "rxjs/Rx";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthInfo } from "./auth-info";
import firebase from 'firebase';
import { User } from "../models/user";
import { UserConfig } from "../models/user-config";



@Injectable()
export class AuthService {

    static UNKNOWN_AUTH = new AuthInfo(null);
    static UNKNOWN_USER = new User("", "unknown", "unknown", null);

    authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_AUTH);
    private subject = new BehaviorSubject(AuthService.UNKNOWN_USER);
    user$: Observable<User> = this.subject.asObservable();
    userConfig$: Observable<UserConfig>;

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase) {

    }

    init() {
        const authInfo = new AuthInfo(this.getActiveUser().uid);
        this.user$ = this.findUserById(this.getActiveUser().uid);
        this.userConfig$ = this.findUserConfigByUserId(this.getActiveUser().uid);
        this.authInfo$.next(authInfo);

    }


    findUserById(id: string): Observable<User> {
        return this.db.list('users', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1

            }
        })
            .map(results => results[0])
            .map(user => {
                return User.fromJson(user);
            })

    }

    findUserConfigByUserId(userId: string): Observable<UserConfig> {
        return this.db.list('usersConfig', {
            query: {
                orderByKey: true,
                equalTo: userId,
                limitToFirst: 1
            }
        })
            .map(result => result[0])
            .do(userConfig =>{
                console.log("Poszukiwany userId: ", userId);
                console.log("User config: ", userConfig);
            })
            .map(userConfig => {
                return UserConfig.fromJson(userConfig);
            })
    }




    login(email, password): Observable<AuthInfo> {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
    }


    signUp(email, password) {
        return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
    }


    fromFirebaseAuthPromise(promise): Observable<any> {

        const subject = new Subject<any>();

        promise
            .then(res => {
                const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
                this.authInfo$.next(authInfo);
                subject.next(res);
                subject.complete();
            },
            err => {
                this.authInfo$.error(err);
                subject.error(err);
                subject.complete();
            });

        return subject.asObservable();
    }


    logout() {
        this.afAuth.auth.signOut();
        this.authInfo$.next(AuthService.UNKNOWN_AUTH);
        this.user$ = new BehaviorSubject(AuthService.UNKNOWN_USER).asObservable();

    }

    getActiveUser() {
        return firebase.auth().currentUser;
    }

}
