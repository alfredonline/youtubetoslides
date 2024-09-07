"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tips } from "@/data";
import { Tips } from "@/types";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import SubmitButton from "./SubmitButton";
import { RunPresentationCreationProcess } from "@/lib/actions";
import { set } from "zod";

const SubmissionForm = ({ user }: { user: KindeUser }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div className="mt-16">
      <div className="w-full p-6 max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gradient">
          Hi, {user.given_name}! Enter A YouTube URL. We will generate an
          amazing presentation for you!
        </h2>
        <p className="text-center text-gray-500 mt-4">
          Make sure you follow all the tips below before submitting the video
          URL.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips?.map((tip: Tips) => (
            <div
              className="p-4 rounded-lg mt-4 border border-gray-300 bg-white"
              key={tip.icon}
            >
              <p className="text-gray-900">{tip.description}</p>
              <div className="text-2xl mt-2">{tip.icon}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-4"
            action={(formData) => {
              setError(null);
              RunPresentationCreationProcess(formData)
                .then((data) => {
                  if (data.success) {
                    router.push("/dashboard");
                  }
                })
                .catch((e) => {
                  setError(e.message);
                });
            }}
          >
            <Input
              placeholder="Enter YouTube URL"
              className="w-full p-8 text-gray-400 bg-white rounded-lg focus:outline-none"
              type="text"
              name="link"
            />
            <Input
              placeholder="Your brand colour"
              className="w-full p-8 text-gray-400 bg-white rounded-lg focus:outline-none"
              type="text"
              name="brandColour"
            />
            <Select name="slideCount">
              <SelectTrigger
                className="w-full text-gray-400 bg-white rounded-lg focus:outline-none px-8 border border-gray-200 h-16"
                name="slideCount"
              >
                <SelectValue placeholder="How many slides do you want approximately?" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Slide Count</SelectLabel>
                  <SelectItem value="5">5 (minimum)</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <br />
            {error && (
              <div className="bg-red-400 text-white p-4 rounded-xl text-center">
                {error}
              </div>
            )}
            <SubmitButton text="Generate Presentation" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmissionForm;
