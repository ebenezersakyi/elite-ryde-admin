import { determineRoute, tableRowData } from "@/utils";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

export default function Table({
  titles,
  data,
  select,
  date,
  approvalType,
  clickable = false,
  route
}: {
  titles: string[];
  data: any[];
  select: number[];
  clickable?: boolean
  date?: number;
  approvalType?: number;
  route: string
}): JSX.Element {
  
  return (
    <div className="w-full overflow-x-scroll">
      <TableHeader titles={titles} />
      {data?.map((elem, inx) => {
        console.log('elem', elem)
        const createdOnDate = new Date(elem.createdOn);
        const formattedDate = `${createdOnDate.getFullYear()}-${String(createdOnDate.getMonth() + 1).padStart(2, '0')}-${String(createdOnDate.getDate()).padStart(2, '0')} ${String(createdOnDate.getHours()).padStart(2, '0')}:${String(createdOnDate.getMinutes()).padStart(2, '0')}:${String(createdOnDate.getSeconds()).padStart(2, '0')}`;

        let newElem = elem
        newElem.createdOn = formattedDate
        return (
          <TableRow
            cols={titles.length}
            data={tableRowData(Object.values(newElem), select, date, approvalType)}
            key={inx}
            id={elem?._id}
            clickable={clickable}
            next={determineRoute(elem?.type)}
            route={route}
            subR={elem.type}
          />
        );
      })}
    </div>
  );
}
