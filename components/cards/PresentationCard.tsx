"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { FaDownload } from "react-icons/fa";
import { GeneratedPowerpoint } from "@/types";

const PresentationCard = ({presentation}: {
    presentation: GeneratedPowerpoint
}) => {

    const [timerActive, setTimerActive] = useState<boolean>(false);

  return (
    <Card className="p-8 transition-shadow duration-300 hover:shadow-lg">
        <div
            className="grid gap-4"
        >
            <div className="grid gap-2 w-full overflow-hidden">
                <h3 className="text-2xl font-bold text-gray-900"
                >
                    {presentation.title || "Untitled Presentation"}
                </h3>
                <p className="text-gray-600 leading-relaxed mt-2">
                    {presentation.description || "No description available"}
                </p>
            </div>
        </div>


        <div className="flex flex-col gap-5 mt-4">
            <Button variant={"default"} className="w-full flex items-center py-3"
                disabled={timerActive}
                onClick={() => {
                    window.open(presentation.link, "_blank");
                    setTimerActive(true);
                    setTimeout(() => {
                        setTimerActive(false);
                    }, 5000);

                }}
            >
                <FaDownload className="h-4 w-4 mr-2" />
                {
                        timerActive ? "Downloading..." : "Download"
                    }
            </Button>
        </div>
    </Card>
  )
}

export default PresentationCard