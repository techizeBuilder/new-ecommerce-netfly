'use client';

import { useState } from 'react';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderReview } from '@/components/checkout/OrderReview';
import { OrderConfirmation } from '@/components/checkout/OrderConfirmation';

export type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [formData, setFormData] = useState({
    shipping: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
    },
    payment: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const updateFormData = (step: 'shipping' | 'payment', data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
  };

  const nextStep = () => {
    const steps: CheckoutStep[] = ['shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: CheckoutStep[] = ['shipping', 'payment', 'review', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <CheckoutSteps currentStep={currentStep} />

        <div className="mt-8">
          {currentStep === 'shipping' && (
            <ShippingForm
              data={formData.shipping}
              onSubmit={(data) => {
                updateFormData('shipping', data);
                nextStep();
              }}
            />
          )}

          {currentStep === 'payment' && (
            <PaymentForm
              data={formData.payment}
              onSubmit={(data) => {
                updateFormData('payment', data);
                nextStep();
              }}
              onBack={prevStep}
            />
          )}

          {currentStep === 'review' && (
            <OrderReview
              formData={formData}
              onConfirm={nextStep}
              onBack={prevStep}
            />
          )}

          {currentStep === 'confirmation' && (
            <OrderConfirmation />
          )}
        </div>
      </div>
    </main>
  );
}