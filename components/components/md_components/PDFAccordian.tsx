import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function PDFAccordian({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-gray-1 rounded-lg p-4">
          <div className="flex items-center space-x-3 no-underline hover:no-underline">
            <div className="bg-red-9 text-white-1 flex h-10 w-10 items-center justify-center rounded-sm text-center text-sm font-bold hover:no-underline">
              <span className="no-underline">PDF</span>
            </div>
            <span className="no-underline">{name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <iframe
            src={src}
            height="999px"
            width="100%"
            className="p-2"
          ></iframe>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
