import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private payPal: PayPal) { 
    
  }
  amount:string;


  paymentAmount: string = '3.33';
  currency: string = 'EUR';
  currencyIcon: string = 'EUR';

  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'AZouWwRKxAFQ9INwB_fJcBdsinrot6TY309zGw2E2QPwiyYuNy-T1Fa7-8FX3MYxrrlECKRuhUFXJbd6',
      PayPalEnvironmentSandbox: 'AUuc7rePf0Oa2CBANe0_K34yWnXAls7RRHcOmRW93pRfxf_AMWro2AK6UKuHyYMvs2qf4eG9W5FjAvzP'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.amount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }



}
