interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="relative pt-4">
      {/* Progress line - positioned behind the circles */}
      <div className="absolute top-8 left-0 right-0 flex h-0.5 -translate-y-1/2">
        <div
          className="h-0.5 bg-orange-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
        <div
          className="h-0.5 bg-gray-200 transition-all duration-300 ease-in-out"
          style={{ width: `${100 - progress}%` }}
        />
      </div>

      {/* Step circles with numbers - positioned above the line */}
      <div className="relative z-10 flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber <= currentStep

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  isActive ? "border-orange-500 bg-orange-500 text-white" : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                {stepNumber}
              </div>
              <div className="mt-2 text-xs font-medium text-gray-500">Step {stepNumber}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
