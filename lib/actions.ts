"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import {
  CheckVideoDetails,
  CleanseTranscript,
  ConvertTextToArrayContent,
  CreateTitleAndDescription,
  ParseXML,
  ImprovePresentationContent,
  CreatePresentationFromArrayOfObjects,
  UploadPowerpointToToUploadThing,
  DeductCoinsAndSavePresentationURL,
} from "./helpers";
import fs from "fs-extra";
import { UploadFileResult } from "uploadthing/types";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

async function checkAndProcess<T>(
  promise: Promise<T>,
  errorMessage: string
): Promise<T> {
  const result = await promise;
  if (!result) {
    throw new Error(errorMessage);
  }
  return result;
}

export async function RunPresentationCreationProcess(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const link = formData.get("link");
  const brandColour = formData.get("brandColour");
  let slideCount = formData.get("slideCount");

  if (!link) {
    console.log("Link is required");
    throw new Error("Link is required");
  }

  if (brandColour) {
    const isHex = /^#[0-9A-F]{6}$/i.test(brandColour.toString());
    if (!isHex) {
      throw new Error("Invalid hex colour");
    }
  }

  if (!slideCount || parseInt(slideCount as string) > 20) {
    slideCount = "5";
  }

  const validLinkRegex =
    /^(http(s)?:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_]+)$/;
  const isValidUrl = validLinkRegex.test(link as string);

  if (!isValidUrl) {
    throw new Error("Invalid YouTube URL");
  }

  const id = link.toString().split("v=")[1];

  if (!id) {
    throw new Error("Invalid YouTube URL");
  }

  try {
    const videoDetails = await checkAndProcess(
      CheckVideoDetails(id),
      "Failed to get video length"
    );

    if (videoDetails.lengthSeconds > 600) {
      throw new Error(
        "Video is too long. Video needs to be shorter than 10 minutes."
      );
    }

    console.log(videoDetails.subtitles.subtitles);

    const englishSubtitls = videoDetails.subtitles.subtitles.find(
      (sub: {
        languageCode: string;
      }) => sub.languageCode === "en"
    
    )

    if (!englishSubtitls) {
      throw new Error("No English subtitles found");
    }

    const parseTranscript = await checkAndProcess(
      ParseXML(englishSubtitls.url),
      "Failed to parse transcript"
    );

    const transcriptCleaned = await checkAndProcess(
      CleanseTranscript(parseTranscript),
      "Failed to cleanse transcript"
    );
    if (!transcriptCleaned) {
      throw new Error("Failed to cleanse transcript");
    }
    const TranscriptAsObjects = await checkAndProcess(
      ConvertTextToArrayContent(
        transcriptCleaned,
        parseInt(slideCount as string)
      ),
      "Failed to convert text to array content"
    );
    const TitleAndDescription = await checkAndProcess(
      CreateTitleAndDescription(TranscriptAsObjects),
      "Failed to create title and description"
    );
    const improvedContent = await checkAndProcess(
      ImprovePresentationContent(TranscriptAsObjects),
      "Failed to improve content"
    );

    const Presentation = await checkAndProcess(
      CreatePresentationFromArrayOfObjects(improvedContent, 
        user

      ),
      "Failed to create presentation"
    );

    if (!(await fs.pathExists(Presentation.filePath))) {
      throw new Error("Failed to create presentation");
    }

    const file = await fs.readFile(Presentation.filePath);

    const uploadResponse = (await checkAndProcess(
      UploadPowerpointToToUploadThing(file, Presentation.fileName),
      "Failed to upload presentation"
    )) as UploadFileResult[];

    const url = uploadResponse[0].data?.url;
    if (!url) {
      throw new Error("Failed to upload presentation");
    }

    console.log(uploadResponse);

    const savePresentationAndUpdateDB = await checkAndProcess(
      DeductCoinsAndSavePresentationURL(
        url,
        user.id,
        Presentation.filePath,
        TitleAndDescription,
        slideCount as string,
        id
      ),
      "Failed to save presentation and update DB"
    );

    return {
      success: true,
    };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function verifyPaymentWasMade(paymentIntentClientSecret: string) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const userInDb = await prisma.user.findFirst({
      where: {
        id: user?.id,
        currentSecretForPayment: paymentIntentClientSecret,
      },
    });

    if (!userInDb) {
      return { success: false };
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userInDb.id,
      },
      data: {
        tokenCount: {
          increment: 20,
        },
        hasPurchasedCoins: true,
        lastCoinPurchase: new Date(),
        totalSpend: {
          increment: 399,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: userInDb.id,
      },
      data: {
        currentSecretForPayment: null,
      },
    });
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
