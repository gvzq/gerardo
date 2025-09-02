import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
interface FaqProps {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      id: "faq-2",
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    },
  ],
}: FaqProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-screen-xl px-6 mx-auto">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-secondary-foreground lg:mb-8 lg:text-3xl">
          {heading}
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <AccordionTrigger className="font-semibold text-secondary-foreground hover:no-underline py-6 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 dark:text-gray-400 pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export { Faq };
