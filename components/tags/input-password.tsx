import { useState } from "react"
import { EyesClose, EyesOpen } from "../icons"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

type InputPasswordProps = {
	className?: string
} & InputProps

export function Input_Password({ className = "", ...props }: InputPasswordProps) {

	const [showPassword, setShowPassword] = useState(false)

	const onToggleView = () => {
		setShowPassword(prev => !prev);
	};

	return (
		<div className="relative">
			<input
				{...props}
				className={`px-4 py-2 rounded border border-deepGray bg-lightGray text-darkGray focus:outline-none focus:ring-2 focus:ring-deepBlue ${className}`}
				type={showPassword ? "text" : "password"}
			/>
			<button
				type="button"
				onClick={onToggleView}
				className="absolute right-3 top-1/2 -translate-y-1/2"
			>
				{showPassword ?
					<EyesClose className="w-5 text-darkBlack" />
					: <EyesOpen className="w-5 text-darkBlack" />}
			</button>
		</div>

	)
}