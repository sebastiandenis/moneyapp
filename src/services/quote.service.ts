import { Injectable, Inject } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { FirebaseApp } from "angularfire2";
import { Observable } from "rxjs/Rx";
import { Quote } from "../models/quote";
import { QuoteCategory } from "../models/quote-category";


@Injectable()
export class QuoteService {

    currentQuote$: Observable<Quote> ;

    sdkDb: any;
    constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
        this.sdkDb = fb.database().ref();
    }

    findAllQuotes(): Observable<Quote[]> {
        return this.db.list('quotes').map(Quote.fromJsonArray);
    }




    findQuoteById(id: string): Observable<Quote> {
        return this.db.list('quotes', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1

            }
        })
            .map(results => results[0])
            .map(quote => {
                return Quote.fromJson(quote);
            })
    }





    findAllQuotesCategories(): Observable<QuoteCategory[]> {
        return this.db.list('categoriesOfQuotes').map(QuoteCategory.fromJsonArray);
    }

    findQuoteCategoryById(id: string): Observable<QuoteCategory> {
        return this.db.list('categoriesOfQuotes', {
            query: {
                orderByKey: true,
                equalTo: id,
                limitToFirst: 1
            }
        })
            .map((results) => {
                return results[0];
            })
    }


    findQuotesKeysPerCategoryId(categoryId: string, query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findQuoteCategoryById(categoryId)
            .filter(category => !!category)
            .switchMap(category => this.db.list(`categoriesOfQuotes/${categoryId}/quotes`, query))
            .map(quotesPerCat => quotesPerCat.map(quotePerCat => quotePerCat.$key))
    }


    findQuotesForKeys(quotesKeys$: Observable<string[]>): Observable<Quote[]> {
        return quotesKeys$
            .map(quotePerCat => quotePerCat.map(quoteKey => this.db.object('quotes/' + quoteKey)))
            .flatMap(fbojs => Observable.combineLatest(fbojs));
    }

    findAllQuotesForCateogryId(categoryId: string): Observable<Quote[]> {
        return this.findQuotesForKeys(this.findQuotesKeysPerCategoryId(categoryId));
    }

    initRandomQuote(categoryId: string) {
        let rand = 0;

        this.currentQuote$ = this.findAllQuotesForCateogryId(categoryId)
        .filter(quotes => !!quotes)
        .map(Quote.fromJsonArray)
        .map(quotes => {
            rand =  Math.floor((Math.random() * quotes.length));
            return quotes[rand];
        })
        .switchMap((randomQuote:Quote) => {
            return this.findQuoteById(randomQuote.$key)
        })
    }

}