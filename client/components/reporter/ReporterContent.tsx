"use client";

import type { Meta } from "@/type";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Globe } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "../ui/link";

function EmptyText() {
  return (
    <></>
  );
}

function ReadMore({ setIsExpanded }: { setIsExpanded: (isExpanded: boolean) => void }) {
  return (
    <Flex textStyle="body/md" display="inline-flex">
      <Text mr="0.4rem">...</Text>
      <Link onClick={() => setIsExpanded(true)}>全文表示</Link>
    </Flex>
  );
}

function MessageText({ isDefault, message }: { isDefault: boolean; message: string }) {
  const TRUNCATED_TEXT_LENGTH = 55;
  const messageWithoutNewLines = message.replace(/\n/g, "");
  const isTruncated = messageWithoutNewLines.length > TRUNCATED_TEXT_LENGTH;
  const [isExpanded, setIsExpanded] = useState(!isTruncated);

  // metdataが未設定の場合は、設定方法を案内するテキストを表示
  if (isDefault) {
    return <EmptyText />;
  }

  return (
    <Text
      as="div"
      textStyle="body/md"
      color="gray.600"
      textAlign="left"
      whiteSpace={isExpanded ? "pre-line" : "normal"}
      wordBreak={isExpanded ? "normal" : "break-all"}
    >
      {!isExpanded ? messageWithoutNewLines.slice(0, TRUNCATED_TEXT_LENGTH) : message}
      {!isExpanded && <ReadMore setIsExpanded={setIsExpanded} />}
    </Text>
  );
}

export function ReporterContent({ meta, children }: { meta: Meta; children: ReactNode }) {
  return (
    <Flex flexDirection="column" gap="4" color="gray.600">
      <Flex flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "flex-start", md: "center" }}>
        <Box mb={{ base: "4", md: "0" }} mr={{ base: "0", md: "4" }} _empty={{ display: "none" }}>
          {children}
        </Box>
        <Flex flexDirection="column" justifyContent="space-between" color="gray.600">
          <Text textStyle="body/sm">レポーター</Text>
          {<Text textStyle="body/md/bold">{meta.reporter}</Text>}
        </Flex>
      </Flex>
      <MessageText isDefault={meta.isDefault} message={meta.message} />
      <Flex gap="3" flexWrap="wrap" w="fit-content" _empty={{ display: "none" }}>
        {!meta.isDefault && meta.webLink && (
          <Button
            variant="tertiary"
            _icon={{
              width: "14px",
              height: "14px",
            }}
            asChild
          >
            <a href={meta.webLink} target="_blank" rel="noopener noreferrer">
              <Flex gap="1" alignItems="center">
                <Globe />
                ウェブページ
              </Flex>
            </a>
          </Button>
        )}
        {!meta.isDefault && meta.privacyLink && (
          <Button variant="tertiary" asChild>
            <a href={meta.privacyLink} target="_blank" rel="noopener noreferrer">
              プライバシーポリシー
            </a>
          </Button>
        )}
        {!meta.isDefault && meta.termsLink && (
          <Button variant="tertiary" asChild>
            <a href={meta.termsLink} target="_blank" rel="noopener noreferrer">
              利用規約
            </a>
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
