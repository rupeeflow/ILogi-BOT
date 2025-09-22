import { IconCommonProps } from '../interfaces/iconCommon.interface'

const UpArrow = ({
  width = 24,
  height = 24,
  fill = '#1D1B20',
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
      <path d="M12 9L17 14H7L12 9Z" fill={fill} />
    </svg>
  )
}

export default UpArrow
