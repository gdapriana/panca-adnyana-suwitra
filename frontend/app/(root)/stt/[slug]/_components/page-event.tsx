"use client";
import { Stt } from "@/lib/types";
import { useEffect, useState } from "react";
import { Event } from "@/lib/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";

export default function PageEvent({ stt }: { stt: Stt }) {
  const [upcomingEvent, setUpcomingEvent] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event[]>([]);
  const [pastEvent, setPastEvent] = useState<Event[]>([]);

  useEffect(() => {
    if (!stt?.events) return;

    const today = new Date();

    const upcoming: Event[] = [];
    const current: Event[] = [];
    const past: Event[] = [];

    stt.events.forEach((event: Event) => {
      const startDate = new Date(event.start_date as Date);
      const endDate = new Date(event.end_date as Date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      const todayMidnight = new Date(today);
      todayMidnight.setHours(0, 0, 0, 0);

      if (todayMidnight < startDate) {
        upcoming.push(event);
      } else if (todayMidnight > endDate) {
        past.push(event);
      } else {
        current.push(event);
      }
    });

    setUpcomingEvent(upcoming);
    setCurrentEvent(current);
    setPastEvent(past);
  }, [stt]);

  return (
    <main className="flex gap-8 justify-center items-stretch flex-col">
      <div className="flex flex-col gap-4 justify-start items-start">
        <div className="flex justify-center gap-2 items-center w-full">
          <h2 className="font-bold text-xl">Acara Berlangsung</h2>
          <div className="bg-secondary h-[2px] flex-1"></div>
        </div>

        {currentEvent.length !== 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {currentEvent.map((event: Event, index) => {
              return (
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <h1 className="font-bold text-lg">
                      {event.name} |
                      <span className="text-base text-muted-foreground font-normal">
                        {" "}
                        Mulai {moment(event.start_date).format(
                          "DD MMM YYYY",
                        )}{" "}
                        hingga {moment(event.end_date).format("DD MMM YYYY")}
                      </span>
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {event.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-start items-start">
        <div className="flex justify-center gap-2 items-center w-full">
          <h2 className="font-bold text-xl">Acara yang akan Datang</h2>
          <div className="bg-secondary h-[2px] flex-1"></div>
        </div>
        {upcomingEvent.length !== 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {upcomingEvent.map((event: Event, index) => {
              return (
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <h1 className="font-bold text-lg">
                      {event.name} |
                      <span className="text-base text-muted-foreground font-normal">
                        {" "}
                        Mulai {moment(event.start_date).format(
                          "DD MMM YYYY",
                        )}{" "}
                        hingga {moment(event.end_date).format("DD MMM YYYY")}
                      </span>
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {event.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-start items-start">
        <div className="flex justify-center gap-2 items-center w-full">
          <h2 className="font-bold text-xl">Acara yang sudah berlalu</h2>
          <div className="bg-secondary h-[2px] flex-1"></div>
        </div>
        {pastEvent.length !== 0 && (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            {pastEvent.map((event: Event, index) => {
              return (
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger>
                    <h1 className="font-bold text-lg">
                      {event.name} |
                      <span className="text-base text-muted-foreground font-normal">
                        {" "}
                        Mulai {moment(event.start_date).format(
                          "DD MMM YYYY",
                        )}{" "}
                        hingga {moment(event.end_date).format("DD MMM YYYY")}
                      </span>
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    {event.description}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </div>
    </main>
  );
}
