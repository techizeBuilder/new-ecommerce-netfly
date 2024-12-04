import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import type { CheckoutStep } from '@/app/checkout/page';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: 'shipping', name: 'Shipping' },
  { id: 'payment', name: 'Payment' },
  { id: 'review', name: 'Review' },
  { id: 'confirmation', name: 'Confirmation' },
] as const;

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const getCurrentStepIndex = () => steps.findIndex((step) => step.id === currentStep);

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const isCurrentStep = step.id === currentStep;
          const isCompleted = getCurrentStepIndex() > index;

          return (
            <li
              key={step.id}
              className={cn(
                'relative flex-1',
                index !== steps.length - 1 && 'pr-8'
              )}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    'h-8 w-8 rounded-full flex items-center justify-center',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isCurrentStep && 'border-2 border-primary',
                    !isCompleted && !isCurrentStep && 'border-2 border-gray-300'
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div
                  className={cn(
                    'ml-4 text-sm font-medium',
                    isCurrentStep && 'text-primary',
                    !isCompleted && !isCurrentStep && 'text-gray-500'
                  )}
                >
                  {step.name}
                </div>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-4 left-0 -ml-px mt-0.5 h-0.5 w-full',
                    isCompleted ? 'bg-primary' : 'bg-gray-300'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}