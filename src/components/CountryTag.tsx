
interface CountryTagProps {
    country:string;
}

function CountryTag({country}:CountryTagProps) {
  return (
    <span
        className="px-2.5 py-1 bg-white text-[#15191E] text-xs rounded border border-[#6B8094]"
    >
        {country}
    </span>
  )
}

export default CountryTag