"use client";

import { BroadlisteningGuide } from "@/components/report/BroadlisteningGuide";
import { HStack, Image } from "@chakra-ui/react";

export function Header() {
  return (
    <HStack justify="space-between" py="5" mb={8} mx={"auto"} maxW={"1200px"}>
      <Image src="/kouchou-ai/images/logo.png" alt="全員市長" w="180px" h="90px" />
      <BroadlisteningGuide />
    </HStack>
  );
}
