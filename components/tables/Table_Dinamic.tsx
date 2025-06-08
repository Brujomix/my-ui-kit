import { ContentModalConfirm } from "../modals/ContentModalConfirm"
import { Button } from "../tags/Button"
import { Trash } from "../icons"
import { useModals } from "../hooks/useModal"

type TableDinamicProps<T> = {
	data?: T[] | null
	columns?: Array<keyof T>
}

export function Table_Dinamic<T extends object>({ data }: TableDinamicProps<T>) {

	const { openModal } = useModals({
		component: ContentModalConfirm,
		props: { title: "Elimiar Usuario ?", onConfirm: () => console.log("Confirmada") },
		callback: () => console.log("usuario eliminado")

	})

	return (
		<>
			{data?.length === 0 ? <p className="text-center mt-20">Lista de elementos vacía</p> :
				<table className="min-w-full divide-y divide-lightGray text-sm text-center  shadow-md rounded-md overflow-scroll">
					<thead className=" text-xs uppercase ">
						<tr>
							{data && Object.keys(data[0]).map((value, index) => (
								<th key={index} className="px-4 py-2 tracking-wider bg-lightGray text-darkBlack">
									{String(value)}
								</th>
							))}

						</tr>
					</thead>
					<tbody className="divide-y divide-lightGray">
						{data?.map((row, index) => (
							<tr key={index} className="hover:bg-deepGray transition-colors duration-300">
								{Object.values(row).map((cell, cellIndex) => (
									<td key={cellIndex} className="px-4 py-2 whitespace-nowrap">
										{String(cell)}
									</td>
								))}
								<td className="px-4 py-2 flex  justify-center">
									<Button onClick={openModal}>
										<Trash className="w-5 text-red-600" />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			}
		</>

	)


}