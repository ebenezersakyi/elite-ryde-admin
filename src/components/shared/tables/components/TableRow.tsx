export default function TableRow({cols, data}:{cols: number, data: string[] | null}){
    return <div className={`w-full grid ${
        "grid-cols-" + cols
      } border-b-[1px] border-l-[1px] border-r-[1px] py-2 cursor-pointer`}>
        {
            data?.map((elem, inx) => {
                return <p  className="pl-5 font-[200]" key={inx}>{elem}</p>
            })
        }
    </div>
}