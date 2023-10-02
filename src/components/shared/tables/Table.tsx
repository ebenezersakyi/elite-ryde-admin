import { determineRoute, tableRowData } from "@/utils";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

export default function Table({
  titles,
  data,
  select,
  date,
  approvalType,
  clickable = false
}: {
  titles: string[];
  data: any[];
  select: number[];
  clickable?: boolean
  date?: number;
  approvalType?: number;
}): JSX.Element {
  
  return (
    <div className="w-full overflow-x-scroll">
      <TableHeader titles={titles} />
      {data?.map((elem, inx) => {
        return (
          <TableRow
            cols={titles.length}
            data={tableRowData(Object.values(elem), select, date, approvalType)}
            key={inx}
            id={elem?._id}
            clickable={clickable}
            next={determineRoute(elem?.type)}
          />
        );
      })}
    </div>
  );
}
