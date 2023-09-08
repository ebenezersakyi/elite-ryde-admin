export default function TableHeader({titles}:{
    titles: string[]
}) {
  return (
    <div
      className={`grid ${
        "grid-cols-" + titles.length
      } py-2  pt-4  bg-[#f1f0f0] border-[1px] border-slate-200 rounded-t-lg`}
    >
      {titles.map((title, inx) => {
        return (
          <p key={inx} className="pl-5 text-slate-600">
            {title}
          </p>
        );
      })}
    </div>
  );
}
