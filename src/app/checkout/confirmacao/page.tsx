'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';
import Confirmation from '@/app/checkout/Form/ConfirmationForm';
import Wrapper from '@/app/checkout/Form/Wrapper';

export default function ConfirmationPage() {
  const { data } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!data.paymentMethod) {
      router.push('/checkout/pagamento');
    }
  }, [data.paymentMethod, router]);

  return (
    <Wrapper step={4}>
      <Confirmation />
    </Wrapper>
  );
}
