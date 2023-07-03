import { find } from "lodash";
import { Page } from "~/typescript/pages";
import { FooterRes, HeaderRes } from "~/typescript/response";

export const useFilter = () => {
  const headerFilter = (
    allEntries: Page[],
    headerRes: HeaderRes
  ): HeaderRes => {
    const navHeaderList = headerRes.navigation_menu;
    if (allEntries.length !== navHeaderList.length) {
      allEntries.forEach((entry) => {
        const newNavFound = find(navHeaderList,(navLink)=>navLink.label === entry.title)
        if (newNavFound) {
          navHeaderList.push({
            label: entry.title,
            page_reference: [{ title: entry.title, url: entry.url }],
          });
        }
      });
    }
    headerRes.navigation_menu = navHeaderList;
    return headerRes;
  };
  const footerFilter = (
    allEntries: Page[],
    footerRes: FooterRes
  ): FooterRes => {
    const navFooterList = footerRes.navigation.link;
    if (allEntries.length !== footerRes.navigation.link.length) {
      allEntries.forEach((entry) => {
        const newLinkFound = find(navFooterList,(navLink)=>navLink.title === entry.title)
        if (newLinkFound) {
          navFooterList.push({ title: entry.title, href: entry.url });
        }
      });
    }
    footerRes.navigation.link = navFooterList;
    return footerRes;
  };
  const jsonFilter = (inputObject: any) => {
    const unWantedProps = [
      "uid",
      "_version",
      "_owner",
      "ACL",
      "_in_progress",
      "created_at",
      "created_by",
      "updated_at",
      "updated_by",
      "publish_details",
    ];
    for (const key in inputObject) {
      unWantedProps.includes(key) && delete inputObject[key];
      if (typeof inputObject[key] !== "object") {
        continue;
      }
      inputObject[key] = jsonFilter(inputObject[key]);
    }
    return inputObject;
  };
  return { headerFilter, footerFilter, jsonFilter };
};
