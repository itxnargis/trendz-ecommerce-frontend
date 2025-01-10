import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Carousel({ children, className = '' }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const childrenArray = React.Children.toArray(children)

  const next = () => {
    setCurrentSlide((current) => 
      current === childrenArray.length - 1 ? 0 : current + 1
    )
  }

  const previous = () => {
    setCurrentSlide((current) => 
      current === 0 ? childrenArray.length - 1 : current - 1
    )
  }

  return (
    <div className={`relative ${className}`}>
      {childrenArray[currentSlide]}
      <button
        onClick={previous}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export function CarouselContent({ children }) {
  return <div className="flex transition-transform duration-300 ease-in-out">{children}</div>
}

export function CarouselItem({ children }) {
  return <div className="flex-none w-full">{children}</div>
}

export function CarouselPrevious() {
  return null // We're using the built-in buttons
}

export function CarouselNext() {
  return null // We're using the built-in buttons
}

