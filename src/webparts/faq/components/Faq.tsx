import * as React from "react";
// import styles from "./Faq.module.scss";
import type { IFaqProps } from "./IFaqProps";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpjsConfig";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
// import { escape } from "@microsoft/sp-lodash-subset";

const Faq = (props: IFaqProps) => {
  // const LOG_SOURCE = 'FAQ Webpart'
  const LIST_NAME = "Tracey FAQ";
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getFAQItems = async () => {
    // console.log('context', _sp)
    const items = _sp.web.lists
      .getByTitle(LIST_NAME)
      .items.select()
      .orderBy("Letter", true)
      .orderBy("Title", true)();
    // console.log(items);
    setFaqItems(
      (await items).map((item) => {
        return {
          Id: item.Id,
          Title: item.Title,
          Body: item.Body,
          Letter: item.Letter,
        };
      })
    );
  };

  useEffect(() => {
    getFAQItems();
  });

  return (
    <>
      {faqItems.map((o: IFAQ, index: number) => {
        return (
          <Accordion key={index} title={o.Title} defaultCollapsed={true}>
            {o.Body}
          </Accordion>
        );
      })}
    </>
  );
};
export default Faq;
