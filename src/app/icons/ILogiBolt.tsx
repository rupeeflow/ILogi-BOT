import Image from 'next/image'

interface ILogiBoltProps {
  width?: number
  height?: number
  className?: string
}

const ILogiBolt = ({ width = 150, height = 40, className }: ILogiBoltProps) => {
  return (
    <Image
      src="/ilogibolt.png"
      alt="iLogiBOT"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

export default ILogiBolt
