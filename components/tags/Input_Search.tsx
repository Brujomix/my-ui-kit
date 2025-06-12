import { Magnifying_Glass } from '../icons'
import { Input } from './Input'

type InputSearchProps = {
    onChangeValue : (value : any)=>void
}

export function Input_Search({ onChangeValue }: InputSearchProps) {
  return (
    <div className="relative">
     
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
        <Magnifying_Glass className="w-5 h-5" />
      </div>

      <Input
        name="searchValues"
        type="search"
        onChange={(e) => onChangeValue(e.target.value)}
        className="pl-10 w-full"
        placeholder="Buscar..."
      />
    </div>
  )
}