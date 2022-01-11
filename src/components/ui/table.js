import { useEffect, useState } from "react";

export default function Table({ columns, loading, dataSource, ...props }) {
  const [datas, setDatas] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsProcessing(true)
    const temp = [...dataSource];
    setDatas(temp)
    setIsProcessing(false)
  }, [dataSource]);

  return (
    <>
      {loading ? (
        <div className="bg-white absolute z-10 rounded-3xl inset-0 flex items-center justify-center">
          <div>Loading ...</div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white flex flex-col text-left shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="table-fix w-full">
            <thead className="text-xs bg-grey-light uppercase border-b border-slate-200">
              <tr>
                {columns.map((column) => (
                  <th
                    className="text-left py-5 px-3 text-slate-600 text-xs"
                    key={column.key}
                  >
                    <div className=" text-grey-dark text-sm font-raleway font-bold">
                      {column.title}
                      {/* {column.sorter && (
                          <ChevronDownIcon color={sorting.current === column.key && sorting.type ? 'blue' : ''} className={`${sorting.current === column.key && sorting.type === 'desc' ? 'transform rotate-180' : ''
                            } w-4 cursor-pointer mr-2 duration-150`}
                            onClick={() => sort(column)} />
                        )} */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {isProcessing ? (
              <div className="bg-white  z-10 rounded inset-0 flex items-center justify-center">
                <div>Loading...</div>
              </div>
            ) : (
              <tbody className="w-full bg-white">
                {datas?.map((data) => (
                  <tr className="border-b border-slate-200" key={data.key}>
                    {Object.keys(data).map((key, index) => {
                      return key !== "key" ? (
                        <td
                          className="text-xs py-5 px-3 text-slate-700 font-semibold"
                          key={index}
                        >
                          {columns.find((c) => c.dataIndex === key).render
                            ? columns
                                .find((c) => c.dataIndex === key)
                                .render(data[key])
                            : data[key]}
                        </td>
                      ) : null;
                    })}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {datas?.length === 0 && (
            <div className="w-full my-5">
              <div className="text-center italic text-grey">0 cours enregistré</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
