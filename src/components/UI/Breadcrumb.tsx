/** @format */

import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className=" my-auto flex">
      <svg
        className="me-2.5 h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20">
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
      </svg>
      <ol
        className="flex items-center whitespace-nowrap"
        aria-label="Breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {item.link ? (
              <Link href={item.link} passHref>
                <span className="flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:focus:text-blue-500">
                  {item.title}
                </span>
              </Link>
            ) : (
              <span className="flex items-center text-sm font-bold text-blue-600">
                {item.title}
              </span>
            )}
            {index !== items.length - 1 && (
              <svg
                className="mx-2 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-600"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true">
                <path
                  d="M6 13L10 3"
                  stroke="currentColor"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
