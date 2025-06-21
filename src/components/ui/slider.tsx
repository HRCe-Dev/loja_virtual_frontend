'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

type IntervalSliderProps = {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function IntervalSlider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  className
}: IntervalSliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      min={min}
      max={max}
      step={step}
      value={value}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track className="bg-muted relative grow overflow-hidden rounded-full h-1">
        <SliderPrimitive.Range className="absolute h-full bg-[#FF7700]" />
      </SliderPrimitive.Track>
      {value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block size-2 rounded-full bg-background border border-primary shadow-sm transition hover:ring-4 ring-ring/50 focus-visible:outline-none focus-visible:ring-4"
        />
      ))}
    </SliderPrimitive.Root>
  )
}
