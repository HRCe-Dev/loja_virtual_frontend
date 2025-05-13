'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';
import PaymentForm from '@/app/checkout/Form/PaymentForm';
import Wrapper from '@/app/checkout/Form/Wrapper';

export default function PaymentPage() {
  const { data } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (!data.address || !data.deliveryMethod) {
      router.push('/checkout/entrega');
    }
  }, [data.address, data.deliveryMethod, router]);

  return (
    <Wrapper step={3} wide>
      <PaymentForm />
    </Wrapper>
  );
}
