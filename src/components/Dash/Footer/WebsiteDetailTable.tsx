// /** @format */

// "use client";

// import FailedNotification from "@/src/components/UIComponents/Notification/FailedNotification";
// import SuccessNotification from "@/src/components/UIComponents/Notification/SuccessNotification";
// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";

// import { getFooterDetails } from "./FooterAction";
// import useFooterMutations from "./FooterMutation";
// import CompanyInfoForm from "./AddFooterDetails";
// import ConfirmButton from "@/src/components/UIComponents/Button/ConfirmButton";
// import Pagination from "@/src/components/UIComponents/TableCategory/Pagination";
// import PaginationTable from "@/src/components/UIComponents/Table/PaginationTable";
// import Breadcrumb from "@/src/components/UIComponents/Breadcrumb";

// export default function WebsiteDetailTable() {
//   const [navItems, setNavItems] = useState<any>([]);
//   const [editItem, setEditItem] = useState(null);
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [openAddNav, setOpenAddNav] = useState<boolean>(false);

//   const { deleteFooter } = useFooterMutations();

//   const { data: footerData, error } = useQuery({
//     queryKey: ["footer"],
//     queryFn: async () => getFooterDetails(),
//   });

//   console.log("footer", footerData);

//   useEffect(() => {
//     if (footerData?.success) {
//       setNavItems(footerData?.data);
//     } else {
//       setNavItems([]);
//     }
//   }, [footerData]);

//   const handleEdit = (footer: any) => {
//     setEditItem(footer);
//     setOpenAddNav(true); // Open the form for editing
//   };

//   const handleDelete = async (footerId: string) => {
//     const deleteNav = await deleteFooter(footerId);
//     if (deleteNav?.success) {
//       setSuccessMessage(deleteNav?.success);
//       setNavItems((prev: any) =>
//         prev.filter((item: any) => item.footerId !== footerId)
//       );
//     } else {
//       setErrorMessage("Error deleting footer");
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredFooterDetails = navItems?.filter((footer: any) =>
//     footer?.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const [currentPage, setCurrentPage] = useState(1); // State to keep track of current page
//   const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default value can be changed
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredFooterDetails.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const handlePaginationClick = (page: number) => {
//     setCurrentPage(page);
//   };
//   const breadcrumbItems = [
//     {
//       title: "Home",
//       link: "/dashboard?component=dashboardAdmin",
//     },
//     { title: "Details" },
//   ];
//   return (
//     <div className="bg-white  px-2">
//       <div className="  flex md:flex-row flex-col justify-between">
//         <div className="my-auto">
//           <Breadcrumb items={breadcrumbItems} />
//         </div>
//         <div className="flex justify-end ">
//           <button
//             className="bg-blue-700 text-xs mb-2 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
//             onClick={() => {
//               setEditItem(null); // Clear any existing edit data
//               setOpenAddNav(true); // Open the form for adding a new footer
//             }}
//           >
//             New Footer
//           </button>
//         </div>
//       </div>
//       <div className="bg-white space-y-2">
//         <div className="w-full ">
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Search party by name, code"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="shadow-xs  block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-xs focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 mb-3"
//             />
//           </div>

//           {successMessage && <SuccessNotification message={successMessage} />}
//           {errorMessage && <FailedNotification message={errorMessage} />}

//           <div className="block md:hidden rounded-lg">
//             <div className="flex-1 overflow-auto h-[55vh] space-y-4 p-4">
//               {currentItems.map((footer: any) => (
//                 <div
//                   key={footer?.footerId}
//                   className="border rounded-lg p-4 mb-4 shadow-md bg-white dark:bg-gray-800"
//                 >
//                   <div className="text-xs mb-2 text-black dark:text-white">
//                     <span className="font-bold text-gray-950 dark:text-gray-300">
//                       Company Name:
//                     </span>{" "}
//                     <span className="text-gray-900 dark:text-gray-400">
//                       {footer?.companyName}
//                     </span>
//                   </div>
//                   <div className="text-xs mb-2 text-black dark:text-white">
//                     <span className="font-bold text-gray-950 dark:text-gray-300">
//                       Company Slogan:
//                     </span>{" "}
//                     <span className="text-gray-900 dark:text-gray-400">
//                       {footer?.companySlogan}
//                     </span>
//                   </div>
//                   <div className="text-xs mb-2 text-black dark:text-white">
//                     <span className="font-bold text-gray-950 dark:text-gray-300">
//                       Email:
//                     </span>{" "}
//                     <span className="text-gray-900 dark:text-gray-400">
//                       {footer?.email}
//                     </span>
//                   </div>
//                   <div className="text-xs mb-2 text-black dark:text-white">
//                     <span className="font-bold text-gray-950 dark:text-gray-300">
//                       Phone:
//                     </span>{" "}
//                     <span className="text-gray-900 dark:text-gray-400">
//                       {footer?.phone}
//                     </span>
//                   </div>
//                   <div className=" gap-2 grid grid-cols-2">
//                     <button
//                       className="text-xs px-2 py-2 border rounded-md bg-violet-500 text-white hover:bg-violet-600 transition"
//                       onClick={() => handleEdit(footer)}
//                     >
//                       Edit
//                     </button>
//                     <ConfirmButton
//                       classNames="text-xs px-2 py-1 border rounded-md bg-red-500 text-white"
//                       buttonName="Delete"
//                       buttonMessage={"Are you sure you want to delete?"}
//                       buttonType="delete"
//                       userId={footer?.footerId}
//                       handleConfirm={(value) => handleDelete(value)}
//                     />
//                     {/* <button
//                     className="text-xs px-2 py-1 border rounded-md bg-red-500 text-white hover:bg-red-600 transition"
//                     onClick={() => handleDelete(footer?.footerId)}
//                   >
//                     Delete
//                   </button> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className="flex max-h-screen flex-col">
//               <div className="-m-1.5 overflow-x-auto">
//                 <div className="inline-block min-w-full p-1.5 align-middle">
//                   <div className="divide-y relative h-[66vh] md:h-[66vh] divide-gray-200 rounded-lg border dark:divide-gray-700 dark:border-gray-700">
//                     <table className=" min-w-full divide-y divide-gray-200 ">
//                       <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
//                         <tr className="">
//                           <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
//                             Company Name
//                           </th>
//                           <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
//                             Company Slogan
//                           </th>
//                           <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
//                             Email
//                           </th>
//                           <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
//                             Phone
//                           </th>
//                           <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-500 dark:divide-gray-700">
//                         {filteredFooterDetails.map((footer: any) => (
//                           <tr
//                             className=" hover:bg-gray-100"
//                             key={footer?.footerId}
//                           >
//                             <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
//                               {footer?.companyName}
//                             </td>
//                             <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
//                               {footer?.companySlogan}
//                             </td>
//                             <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
//                               {footer?.email}
//                             </td>
//                             <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
//                               {footer?.phone}
//                             </td>
//                             <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
//                               <div className="flex text-center space-x-2">
//                                 <button
//                                   className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
//                                   onClick={() => handleEdit(footer)}
//                                 >
//                                   Edit
//                                 </button>
//                                 <ConfirmButton
//                                   classNames="text-xs px-2 py-1 border rounded-md bg-red-500 text-white"
//                                   buttonName="Delete"
//                                   buttonMessage={
//                                     "Are you sure you want to delete?"
//                                   }
//                                   buttonType="delete"
//                                   userId={footer?.footerId}
//                                   handleConfirm={(value) => handleDelete(value)}
//                                 />
//                                 {/* <button
//                                   className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                                   onClick={() => handleDelete(footer?.footerId)}
//                                 >
//                                   Delete
//                                 </button> */}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {openAddNav && (
//         <CompanyInfoForm
//           initialData={editItem}
//           onClose={() => setOpenAddNav(false)} // Close the form when done
//         />
//       )}
//       <div className="mt-2">
//         <PaginationTable
//           currentPage={currentPage}
//           data={filteredFooterDetails}
//           handlePaginationClick={handlePaginationClick}
//           itemsPerPage={itemsPerPage}
//           indexOfLastItem={indexOfLastItem}
//         />
//       </div>
//     </div>
//   );
// }
