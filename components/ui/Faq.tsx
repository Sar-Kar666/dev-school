import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq(){
    return<div className="lg:px-30  text-slate-700">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                            <AccordionTrigger className="text-xl font-sans font-normal">Do I need prior coding experience to join?</AccordionTrigger>
                            <AccordionContent className="text-lg">
                            No prior experience is required. Our courses are designed to take you from beginner to advanced levels with structured learning paths.
                            </AccordionContent>
                    </AccordionItem>
                       <AccordionItem value="item-2">
                            <AccordionTrigger className="text-xl font-sans font-normal">What kind of support can i expect?</AccordionTrigger>
                            <AccordionContent className="text-lg">
                            You'll get 24/7 community support through our active Discord, weekly study groups, peer code reviews, and direct mentorship opportunities
                            </AccordionContent>
                    </AccordionItem>
                       <AccordionItem value="item-3">
                            <AccordionTrigger className="text-xl font-sans font-normal">  Are the courses self-paced or scheduled?</AccordionTrigger>
                            <AccordionContent className="text-lg">
                            We offer both self-paced learning materials and scheduled live sessions, giving you the flexibility to learn at your own pace while staying connected with the community.
                            </AccordionContent>
                    </AccordionItem>
                       <AccordionItem value="item-4">
                            <AccordionTrigger className="text-xl font-sans font-normal">Are the classes in online mode?</AccordionTrigger >
                            <AccordionContent className="text-lg">
                          yes classes will be online and recorings will be available on the dev-school website
                            </AccordionContent>
                    </AccordionItem>
                       <AccordionItem value="item-5">
                            <AccordionTrigger className="text-xl font-sans font-normal" >Are the projects end-to-end and from scratch?</AccordionTrigger>
                            <AccordionContent className="text-lg">
                            yes, absolutly
                            </AccordionContent>
                    </AccordionItem>
            </Accordion>
        </div>
}