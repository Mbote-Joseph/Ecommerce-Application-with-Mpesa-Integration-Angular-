import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private backendUrl = 'http://localhost:3000/lipa/stkpush';

  constructor(private http: HttpClient) {}

  stkPush(phone: string, amount: number) {
    return this.http.post(this.backendUrl, { phone, amount });
  }


}
