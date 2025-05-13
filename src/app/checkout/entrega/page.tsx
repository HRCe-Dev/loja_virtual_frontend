'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';
import DeliveryForm from '@/app/checkout/Form/DeliveryForm';
import Wrapper from '@/app/checkout/Form/Wrapper';

export default function DeliveryPage() {
  const { data } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    // Se não tem usuário, volta para cadastro
    if (!data.user) router.push('/checkout');
  }, [data.user, router]);

  return (
    <Wrapper step={2}>
      <DeliveryForm />
    </Wrapper>
  );
}
