/**
 * Steps the jobs can listen for.
 */
export enum Step {
  CustomerInformation = 'customer_information',
  ShippingMethod = 'shipping_method',
  PaymentMethod = 'payment_method',
  ThankYou = 'thank_you',
}

export declare type StepType = keyof typeof Step;
