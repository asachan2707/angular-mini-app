import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, from, Subject, Subscription, forkJoin } from 'rxjs';
import {
  map,
  switchMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private dataFetchURI = `http://157.245.104.227/api/country/`;
  // private dataFetchURI = `http://157.245.104.227/api/country/?page_size=5&page=2`;

  subscriptions = new Subscription();
  countriesData = {};
  public dataFetchReq$ = new Subject();
  private dataFetchSuccessResponse = new Subject();
  public get dataFetchSuccess() {
    return this.dataFetchSuccessResponse.asObservable();
  }
  private dataFetchFailureResponse = new Subject();
  public get dataFetchFailure() {
    return this.dataFetchFailureResponse.asObservable();
  }

  constructor(private http: HttpClient) {}

  getBackendData(param) {
    const url = this.createQuery(param);
    this.subscriptions.add(
      this.http
        .get(url)
        .pipe(
          switchMap((countries: { results: any[] }) => {
            console.log(countries);
            this.countriesData = countries;
            this.dataFetchSuccessResponse.next(countries);
            return forkJoin(
              countries.results.map(country => this.getCountryStates(country))
            );
          }),
          map((result: any) => {
            console.log(result, 'result');
            return result.map(res => {
              res[res.length - 1].statesInDetail = [];
              res[res.length - 1].statesInDetail = res
                .slice(0, res.length - 1)
                .map(stateResult => stateResult.results[0]);
              return res[res.length - 1];
            });
          })
        )
        .subscribe(result => {
          console.log('::results', result);
          const response = {
            count: this.countriesData,
            results: result
          };
          this.dataFetchSuccessResponse.next(response);
        })
    );
  }

  getCountryStates(country) {
    const result = [];
    country.states.forEach(state => {
      result.push(
        this.http.get('http://157.245.104.227/api/state/?id=' + state)
      );
    });
    result.push(of(country));
    return forkJoin(result);
  }

  createQuery(param) {
    const url =
      this.dataFetchURI + `?page_size=${param.pageSize}&page=${param.page}&search=${param.search}`;
    console.log('params:  ', param, url);
    return url;
  }
}
