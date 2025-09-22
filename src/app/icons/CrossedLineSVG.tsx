import { IconCommonProps } from '../interfaces/iconCommon.interface'
const CrossedLineSVG = ({
  width = 101,
  height = 102,
  fill = '#333333',
  className,
}: IconCommonProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 1280 1945"
      fill="none"
      className={className}
    >
      <path
        d="M-104.717 2C-112.55 79.4892 39.3702 268.49 709.712 404.579C1547.64 574.691 1480.73 1047.82 798.364 974.66C116 901.5 -537.426 1057.38 163 1198.29C771.015 1320.61 773.973 1734.66 462 1931.75"
        stroke="url(#paint0_linear_1_150)"
        strokeWidth="31"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_150"
          x1="233.254"
          y1="-127.635"
          x2="646.271"
          y2="1184.43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B2AEE" />
          <stop offset="1" stopColor="#F6A775" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CrossedLineSVG
