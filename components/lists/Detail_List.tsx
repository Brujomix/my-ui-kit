type DetailListProps<T> = {
  data?: T[];
};

export function Detail_List<T>({ data }: DetailListProps<T>) {

  console.log(data);
  
  return (
    <>
      {data && (
        <>
          <div>

          </div>
          <div className="grid grid-cols-1">
            {data.map((v, index) =>
             <span>{v.createAt}</span>
            )}
          </div>
        </>
      )}
    </>
  );
}
