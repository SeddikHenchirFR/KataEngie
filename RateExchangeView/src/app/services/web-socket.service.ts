import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface RateData {
  IdRate: string;
  Pair: string;
  Rate: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: WebSocket;
  public rates$: BehaviorSubject<RateData[]> = new BehaviorSubject<RateData[]>([]);

  constructor() {
    this.connect();
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:5000/ws');

    this.socket.onmessage = (event) => {
      const data: RateData[] = JSON.parse(event.data);
      this.rates$.next(data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
}
