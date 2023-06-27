"use client";

/**
 *  @fileOverview Takes a list of items and returns a table.
 *  @author Quentin Le Pape
 */

import styles from "./table.module.css";
// import Link from "next/link";
import {
  CurriculumVitaeType,
  ICurriculumVitaeEducation,
  ICurriculumVitaeExperience,
  ICurriculumVitaePatents,
} from "../../data/curriculumVitae";
import Image from "next/image";
import IconSquare from "../IconSquare";
import Icon from "../Icon";

/**
 * Takes a list of curriculum vitae items and returns a list of table items.
 * @param   {TCurriculumVitaeItem[]} tableData a list of curriculum vitae items
 *
 * @returns {ITableItem[]} a list of table items
 */
function toTableItems(tableData: TCurriculumVitaeItem[]): ITableItem[] {
  const tableItems: ITableItem[] = tableData.map((item) => toITableItem(item));
  return tableItems;
}

/**
 * Takes a curriculum vitae item and returns a table item.
 * @param   {TCurriculumVitaeItem} item a curriculum vitae item
 *
 * @returns {ITableItem} a table item
 */
function toITableItem(item: TCurriculumVitaeItem): ITableItem {
  switch (item.type) {
    case "experience": {
      const tableItem: ITableItem = {
        image: item.image.imageSource ? (
          <Image
            src={item.image.imageSource}
            alt={item.image.imageAlt}
            width={30}
            height={30}
            className="border-inset rounded mr-3.5 w-7.5 aspect-square h-auto"
          ></Image>
        ) : item.image.svgSource ? (
          <div className="border-inset rounded mr-3.5 w-7.5 h-7.5 aspect-square">
            {item.image.svgSource}
          </div>
        ) : (
          item.image.icon && <IconSquare name={item.image.icon}></IconSquare>
        ),
        title: item.companyName,
        subtitle: item.detail && "(" + item.detail + ")",
        link: item.link,
        description: item.jobTitles,
        date: item.date,
        type: item.type,
      };
      return tableItem;
    }
    case "education": {
      const tableItem: ITableItem = {
        title: item.diploma,
        subtitle: "at " + item.institution,
        date: item.date,
        type: item.type,
      };
      return tableItem;
    }
    case "patent": {
      const tableItem: ITableItem = {
        title: item.id,
        subtitle: "– " + item.label,
        link: item.link,
        date: item.date,
        type: item.type,
      };
      return tableItem;
    }
  }
}

/**
 * Takes a table item and returns a table row header.
 * @param   {ITableItem} item a table item
 *
 * @returns {JSX.Element} a table row header
 */
function RowHeader(item: ITableItem): JSX.Element {
  const rowContent: JSX.Element = (
    <div>
      <div className="flex flex-row text-regular items-center py-4.5">
        {item.image && item.image}
        <h3 className="text-S text-medium text-line-height-S text-left">
          <span className="mr-2.5">
            {item.title}
            {item.subtitle && (
              <span className="ml-1.25 text-faded text-regular">
                {item.subtitle}
                {item.date && !item.description && (
                  <span
                    className={`${styles.rowHeaderResponsiveContentContainerInline} hidden text-ultra-faded`}
                  >
                    {" "}
                    &#40;{renderRowEnd(item, "text-left text-ultra-faded")}
                    &#41;
                  </span>
                )}
              </span>
            )}
          </span>
          {item.link && (
            <span
              className={`${styles.linkIcon} relative top-0.25 text-dark/30 inline-flex items-center transition`}
            >
              <Icon name="Share" size="14"></Icon>
            </span>
          )}
        </h3>
      </div>
      {item.date && item.description && (
        <div
          className={`${
            styles.rowHeaderResponsiveContentContainer
          } hidden pb-6 -mt-2.5 ${item.image && "ml-11"} flex flex-col gap-1.5`}
        >
          {renderRowMiddle(item, "text-left")}
          {renderRowEnd(item, "text-left")}
        </div>
      )}
    </div>
  );
  return (
    <th scope="row" className={`${styles.rowHeaderWrapper}`}>
      {rowContent}
      {/* {item.link ? (
        <Link href={item.link} target="_blank">
          {rowContent}
        </Link>
      ) : (
        rowContent
      )} */}
    </th>
  );
}

/**
 * Takes a table item and returns a table row middle.
 * @param   {ITableItem} item a table item
 *
 * @returns {JSX.Element} a table row middle
 */
function RowMiddle(item: ITableItem): JSX.Element {
  return (
    <td className={`${styles.rowMiddleWrapper} py-4.5 px-5`}>
      {renderRowMiddle(item)}
    </td>
  );
}
function renderRowMiddle(item: ITableItem, classNames?: string): JSX.Element {
  return (
    <div
      className={`${styles.rowMiddleContent} separate-2 separate-after separate-slash separate-currentColor text-regular text-faded text-line-height-S ${classNames}`}
    >
      {item.description?.map((description, i) => (
        <span className="inline-block" key={i}>
          {description}
        </span>
      ))}
    </div>
  );
}

/**
 * Takes a table item and returns a table row end.
 * @param   {ITableItem} item a table item
 *
 * @returns {JSX.Element} a table row end
 */
function RowEnd(item: ITableItem): JSX.Element {
  return (
    <td className={`${styles.rowEndWrapper} py-4.5 text-right`}>
      {renderRowEnd(item)}
    </td>
  );
}
function renderRowEnd(item: ITableItem, classNames?: string): JSX.Element {
  return (
    <span
      className={`${styles.rowEndContent} separate separate-dash separate-currentColor text-regular text-faded text-line-height-S whitespace-nowrap ${classNames}`}
    >
      {typeof item.date !== "string" && item.date.startDate && (
        <span>{item.date.startDate}</span>
      )}
      <span>
        {typeof item.date !== "string" ? item.date.endDate : item.date}
      </span>
    </span>
  );
}

/**
 * A table item
 */
interface ITableItem {
  /**
   * An image for the item, which will appear on the start of the row.
   */
  image?: JSX.Element;

  /**
   * The title of the item, which will appear as an `h2` on the row.
   */
  title: string;

  /**
   * A subtitle for the item, which will appear after the `title`.
   */
  subtitle?: string;

  /**
   * A link for the item, which will appear after the `title` (and after the `subtitle` if `subtitle` is set).
   */
  link?: URL;

  /**
   * A description for the item, which will appear on a separate column.
   */
  description?: string[];

  /**
   * The date for the item, which will appear on a column at the end of the row.
   */
  date: { startDate: string; endDate: string } | string;

  /**
   * The date for the item, which will appear on a column at the end of the row.
   */
  type: CurriculumVitaeType;
}

/**
 * A curriculum vitae item
 */
type TCurriculumVitaeItem =
  | ICurriculumVitaeExperience
  | ICurriculumVitaeEducation
  | ICurriculumVitaePatents;

/**
 * Takes a list of items and returns a table.
 * @param   {TCurriculumVitaeItem[]} data a list of items
 *
 * @returns {JSX.Element} a table
 */
export default function Table({
  data,
}: {
  data: TCurriculumVitaeItem[];
}): JSX.Element {
  const tableItems: ITableItem[] = toTableItems(data);
  return (
    <table
      className={`${styles.table} w-full table border-y border-color text-S`}
    >
      <tbody className="">
        {tableItems.map((el, i) => (
          <tr
            key={i}
            onClick={() => {
              el.link && window.location.assign(el.link);
            }}
            className={el.link ? styles.linkRow : ""}
          >
            {RowHeader(el)}
            {RowMiddle(el)}
            {RowEnd(el)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
