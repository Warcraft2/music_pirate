import { HttpClient,HttpHeaders, HttpRequest } from '@angular/common/http';
import { SpotifyService } from './spotify.service';
import { Component } from '@angular/core';
import { CLIENT_ID, CLIENT_SECRET_KEY } from './spotify-credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Music Pirate';
  constructor(private service:SpotifyService, private http:HttpClient){}
  demoSearch(query:string):void
  {
    // let headers: HttpHeaders = new HttpHeaders();
    // let encodeClientID: string =btoa(`${CLIENT_ID}:${CLIENT_SECRET_KEY}`);

    // headers.append('Authorization', `Basic ${encodeClientID}`);
    // headers.append('Access-Control-Allow-Origin','*');
    // headers.append('Content-Type','application/x-www-form-urlencoded');

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': `Basic ${encodeClientID}`,
    //     'Content-Type':'application/x-www-form-urlencoded'
    //   })
    // };

    // this.http.post('https://accounts.spotify.com/api/token','grant_type=client_credentials',httpOptions
    // ).subscribe(data=>{console.log(data['access_token']);});
  this.service.searchTrack('Love me love you').subscribe(data=>{console.log(data);});
  }
}
