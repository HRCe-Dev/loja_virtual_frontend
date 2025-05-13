'use client';

import Stepper from './Stepper';
import React from 'react';

export default function Wrapper({
  children,
  step,
  wide = false,
}: {
  children: React.ReactNode;
  step: number;
  wide?: boolean;
}) {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <Stepper current={step} />
      <div className={`${wide ? 'max-w-5xl' : 'max-w-2xl'} mx-auto`}>
        {children}
      </div>
    </main>
  );
}
