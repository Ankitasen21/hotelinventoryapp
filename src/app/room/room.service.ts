import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Room } from "../rooms/Room";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class RoomService{
    
    private baseUrl = 'http://localhost:4200/api';

    constructor(private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
    ){ }

    getRooms(): Observable<Room[]>{
        return this.http.get<Room[]>(`${this.baseUrl}/rooms`);
    }
    
    getRoomById(id: string): Observable<Room>{
        return this.http.get<Room>(`${this.baseUrl}/rooms/${id}`);
    }
}