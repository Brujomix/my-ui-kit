import { Magnifying_Glass } from '../icons'
import { Input } from './input'

type InputSearchProps = {
    onChangeValue : (value : string)=>void
}

export function Input_Search({ onChangeValue }: InputSearchProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-deepBlue">
        <Magnifying_Glass className="w-4 h-4" />
      </div>

      <Input
        name="searchValues"
        type="search"
        onChange={(e) => onChangeValue(e.target.value)}
        className="pl-10"
        placeholder="Buscar..."
      />
    </div>
  )
}