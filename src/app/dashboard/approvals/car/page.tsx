"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import ApprovalField from "@/components/shared/approvals/Field";
import DocumentLink from "@/components/shared/approvals/LinkDoc";
import useFetchSingle from "@/hooks/useFetchSIngle";
import { manageApproval, returnDocumentTitle } from "@/utils";
import { useEffect } from "react";
export default function CarApproval() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (!searchParams.get("id")) {
      router.back();
    }
  }, []);
  const { loading, data, error } = useFetchSingle(
    searchParams.get("id") as string
  );
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h4 className="text-[2.5rem] mb-6">Approve Car</h4>

      <div className="grid grid-cols-12">
        <Image
          src={""}
          alt="profile-picture"
          className="w-full aspect-square col-span-4"
        />
        <div className="col-span-1"></div>
        <div className="w-full col-span-6 flex flex-col justify-between h-fit gap-5">
          <h4 className="text-[2rem]">Car Details</h4>
          <span className="flex flex-col gap-2 divide-y-[0.9px]">
            {data?.content?.map((elem: string[], inx: number) => {
              return (
                <ApprovalField title={elem[0]} value={elem[1]} key={inx} />
              );
            })}
          </span>

          <span>
            {data?.docs?.map((elem: string[], inx: number) => {
              return (
                <DocumentLink
                  link={returnDocumentTitle(elem[0])}
                  href={elem[1]}
                  key={inx}
                />
              );
            })}
          </span>
        </div>
      </div>

      <div className="flex justify-end items-center gap-[2rem] mt-[3rem]">
        {data?.status == "Pending" ? (
          <>
            <button
              className="bg-[#00FF7F] inline-block p-2 rounded-md text-white"
              onClick={() => {
                manageApproval(searchParams.get("id") as string, true, () => {
                  router.back();
                });
              }}
            >
              Approve
            </button>
            <button className="bg-[#FF3131] inline-block p-2 rounded-md text-white">
              Reject
            </button>
          </>
        ) : (
          <p
            className={`${
              data?.status == "Rejected"
                ? "bg-[#FF3131] inline-block p-2 rounded-md text-white"
                : "bg-[#00FF7F] inline-block p-2 rounded-md text-white"
            }`}
          >
            Status: {data?.status}
          </p>
        )}
      </div>
    </div>
  );
}
