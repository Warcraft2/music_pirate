import { CLIENT_ID, CLIENT_SECRET_KEY } from "./spotify-credentials";
import { Provider } from "@angular/compiler/src/core";

export const API_INJECTABLE : Array<Provider> = [
{provide : CLIENT_ID, useValue: CLIENT_ID},
{provide : CLIENT_SECRET_KEY, useValue: CLIENT_SECRET_KEY}
]
