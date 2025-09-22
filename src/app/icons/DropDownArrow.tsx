import { IconCommonProps } from '../interfaces/iconCommon.interface'

const DropDownArrow = ({
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
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path d="M12 15L7 10H17L12 15Z" fill="#1D1B20" />
    </svg>
  )
}

export default DropDownArrow
