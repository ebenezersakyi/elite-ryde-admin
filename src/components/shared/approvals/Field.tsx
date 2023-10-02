export default function ApprovalField({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <span className="flex justify-between w-full px-1 py-3">
      <p className="font-[300]">{title}</p>
      <p className="font-[200] truncate" >{value}</p>
    </span>
  );
}
