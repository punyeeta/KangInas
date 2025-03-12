import logoBlue from '../../assets/LogoBlue.svg'

interface LogoBlueProps {
  className?: string;
}

const LogoBlue: React.FC<LogoBlueProps> = ({ className }) => {
  return (
    <img src={logoBlue} className={className}/>
  )
}

export default LogoBlue