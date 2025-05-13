"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
};

type AddressInfo = {
  country: string;
  island: string;
  city: string;
  zone: string;
};

type DeliveryMethod = 'pickup' | 'mail' | 'home';

type PaymentMethod = 'vinti4' | 'transfer';

type CheckoutData = {
  user?: UserInfo;
  address?: AddressInfo;
  deliveryMethod?: DeliveryMethod;
  paymentMethod?: PaymentMethod;
};

type CheckoutContextType = {
  data: CheckoutData;
  setData: (data: Partial<CheckoutData>) => void;
  reset: () => void;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [data, setCheckoutData] = useState<CheckoutData>({});

  const setData = (newData: Partial<CheckoutData>) => {
    setCheckoutData(prev => ({ ...prev, ...newData }));
  };

  const reset = () => setCheckoutData({});

  return (
    <CheckoutContext.Provider value={{ data, setData, reset }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error('useCheckout must be used within CheckoutProvider');
  return context;
};
