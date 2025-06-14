import { ContentModalConfirm } from "../modals/ContentModalConfirm"
import { Trash } from "../icons"
import { useModals } from "../hooks/useModal"

type TableDinamicProps<T> = {
  data?: T[] | null
  titleModal: string
}

export function Table_Dinamic<T extends object>({ data, titleModal }: TableDinamicProps<T>) {

  const { openModal, closeModal } = useModals({
    component: ContentModalConfirm,
    props: { title: titleModal, close: () => closeModal },
  })

  return (
    <div className="w-full overflow-x-auto">
      {data?.length === 0 ? <p className="text-center mt-20">No hay elementos en la lista</p> :
        <table className="min-w-full divide-y divide-darkGray text-xs md:text-sm text-center shadow-md rounded-md">
          <thead className="text-xs uppercase">
            <tr>
              {data && Object.keys(data[0]).map((key, index) => (
                <th key={index} className="px-1 py-2 text-center tracking-wider bg-lightGray text-darkBlack">
                  {key}
                </th>
              ))}
              <th className="px-2 py-2 bg-lightGray text-darkBlack">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-darkGray">
            {data && data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-darkGray transition-colors duration-300">
                {Object.values(row).map((col, colIndex) => (
                  <td key={colIndex} className="px-2 py-4 whitespace-normal text-center break-words max-w-[80px]">
                    {typeof col === 'object' && col !== null
                      ? Object.values(col).map((v) => `${v}`).join(" | ")
                      : String(col)}
                  </td>
                ))}
                <td>
                  <div className="flex justify-center items-center">
                    <button onClick={openModal}>
                      <Trash className="w-5 md:w-7 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  )
}
