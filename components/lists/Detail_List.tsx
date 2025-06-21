type DetailListProps<T> = {
  data?: T[];
};

export function Detail_List<T>({ data }: DetailListProps<T>) {
  return (
    <>
      {data &&
        data.map((v, index) => (
          <div key={index}>
            <span>{String(v)}</span>
          </div>
        ))}
    </>
  );
}
