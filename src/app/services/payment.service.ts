import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private backendUrl = 'https://5ad0-41-90-35-29.ngrok-free.app/lipa';

  constructor(private http: HttpClient) {}

// services/payment.service.ts

stkPush(phone: string, amount: number) {
  return this.http.post<any>('http://localhost:3000/lipa/stkpush', { phone, amount });
}

checkPaymentStatus(checkoutRequestID: string) {
  return this.http.get<any>(`https://6130-41-90-35-29.ngrok-free.app/lipa/status?checkoutRequestID=${checkoutRequestID}`);
}


}
