import React from 'react'

export function UkFlagIcon({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-flag-clip">
        <rect width="60" height="30" rx="3" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6" />
        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export function FranceFlagIcon({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="fr-flag-clip">
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath="url(#fr-flag-clip)">
        <rect width="10" height="20" fill="#002395" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#ED2939" />
      </g>
    </svg>
  )
}

export function MoroccoFlagIcon({ className = 'w-5 h-3.5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 30 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="ma-flag-clip">
        <rect width="30" height="20" rx="2" />
      </clipPath>
      <g clipPath="url(#ma-flag-clip)">
        <rect width="30" height="20" fill="#C1272D" />
        {/* Moroccan Green 5-pointed Star (Pentagram) */}
        <polygon
          points="15,4.5 17.6,12.5 11,7.5 19,7.5 12.4,12.5"
          fill="none"
          stroke="#006233"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
