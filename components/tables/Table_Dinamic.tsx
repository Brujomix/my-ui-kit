import { ContentModalConfirm } from "../modals/ContentModalConfirm"
import { Button } from "../tags/Button"
import { Trash } from "../icons"
import { useModals } from "../hooks/useModal"

type TableDinamicProps<T> = {
  data?: T[] | null
  columns: string[]
  titleModal: string
}

export function Table_Dinamic<T extends object>({ columns, data, titleModal }: TableDinamicProps<T>) {

  const { openModal, closeModal } = useModals({
    component: ContentModalConfirm,
    props: { title: titleModal, close: () => closeModal },
  })

  return (
    <>
      {data?.length === 0 ? <p className="text-center mt-20">Lista de elementos vacía</p> :
        <table className="min-w-full divide-y divide-lightGray text-sm text-center  shadow-md rounded-md overflow-scroll">
          <thead className=" text-xs uppercase ">
            <tr>
              {columns && columns.map((v, index) => (
                <th key={index} className="px-4 py-2 tracking-wider bg-lightGray text-darkBlack">
                  {v}
                </th>
              ))}

            </tr>
          </thead>
          <tbody className="divide-y divide-lightGray">
            {data?.map((row, index) => (
              <tr key={index} className="hover:bg-deepGray transition-colors duration-300">
                {columns?.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                    {String((row as any)[col])}
                  </td>
                ))}
                <td className="px-4 py-2 flex justify-center">
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