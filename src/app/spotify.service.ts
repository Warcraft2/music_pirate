import { CLIENT_ID, CLIENT_SECRET_KEY } from './spotify-credentials';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  encodedClientKeySecreyKey:string;
  accessToken:string;
  expried:boolean=true;
  constructor(public http:HttpClient, @Inject(CLIENT_ID)private clientKey:string, @Inject(CLIENT_SECRET_KEY)private clientSecretKey:string) {
    this.encodedClientKeySecreyKey=btoa(`${clientKey}:${clientSecretKey}`);
  }
  authorize():void {
    let headers: HttpHeaders = new HttpHeaders();
    let encodeClientID: string =btoa(`${CLIENT_ID}:${CLIENT_SECRET_KEY}`);

    headers.append('Authorization', `Basic ${encodeClientID}`);
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Content-Type','application/x-www-form-urlencoded');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${encodeClientID}`,
        'Content-Type':'application/x-www-form-urlencoded'
      })
    };

    this.http.post('https://accounts.spotify.com/api/token','grant_type=client_credentials',httpOptions
    ).subscribe(data=>{this.accessToken=data['access_token'];
            this.expried=false;
  });
  }

  searchTrackThroughApi(query:string){
    let params :string =[
      `q=${query}`,
      `type=track`
      ].join('&');
      let queryURL: string = `https://api.spotify.com/v1/search?${params}`;
      //console.log(queryURL);
      //let tracksURL: string = `https://api.spotify.com/v1/tracks/6LLrHyHNvwIa0HqMaPG8du`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.accessToken}`
        })
      };
      return this.http.get<HttpResponse<Object>>(queryURL,httpOptions);
      //.subscribe(data=>{console.log(data);});
     // this.http.get(tracksURL,httpOptions).subscribe(data=>{console.log(data);});
  }

  searchTrack(query:string){
  if(this.expried==true){
    let headers: HttpHeaders = new HttpHeaders();
    let encodeClientID: string =btoa(`${CLIENT_ID}:${CLIENT_SECRET_KEY}`);

    headers.append('Authorization', `Basic ${encodeClientID}`);
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Content-Type','application/x-www-form-urlencoded');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${encodeClientID}`,
        'Content-Type':'application/x-www-form-urlencoded'
      })
    };

    this.http.post('https://accounts.spotify.com/api/token','grant_type=client_credentials',httpOptions
    ).subscribe(data=>{this.accessToken=data['access_token'];
            this.expried=false;
            return this.searchTrackThroughApi(query);
  });
  }else{
    return this.searchTrackThroughApi(query);
  }

  }
}
