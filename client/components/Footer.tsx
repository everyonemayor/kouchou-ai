"use client";

import type { Meta } from "@/type";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { Button } from "./ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = {
  meta: Meta;
};

const Dialog = ({ title, trigger, children }: { title: string; trigger: ReactNode; children: ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <DialogRoot size="sm" initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        mx="4"
        color="gray.800"
        bg="linear-gradient(216.39deg, #FCFFDB -0.01%, #F0FDF4 24.99%, #ECFEFF 35%, #FFFFFF 50%);
"
      >
        <DialogHeader pt={{ base: "6", md: "8" }} justifyContent="center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody px={{ base: "6", md: "8" }}>
          <Text textStyle="body/md">{children}</Text>
        </DialogBody>
        <DialogCloseTrigger />
        <DialogFooter pb={{ base: "6", md: "8" }} justifyContent="center">
          <DialogActionTrigger asChild>
            <Button ref={ref} variant="tertiary" size="md">
              閉じる
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export function Footer({ meta }: Props) {
  return (
    <Box as="footer" color="gray.800">
      <Box bg="url('/kouchou-ai/images/footer-bg.webp')" 
        bgSize="cover"
        bgPos="center" py={{ base: "6", md: "10" }} px={{ base: "6", md: "12" }} mx="auto">
        <Flex
          bg="white"
          py="8"
          px="8"
          borderRadius="3xl"
          maxW="1024px"
          mx="auto"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={{ base: "center" }}
          gap="8"
        >
          <Flex flexDirection="column" gap="4">
            <Text>
              「#全員市長」は「こんな未来を作りたい」「こんな課題をこう解決したい」という奈良市への意見・アイディアを募集し、実際に次年度以降の取組に反映していくための取り組みです。奈良に住む人に限らず、誰でも参加できます。お気軽にご意見をお寄せください。
            </Text>
            <Flex gap="3" flexWrap="wrap">
              <Button variant="primary" asChild size="xl" color="#174ea1" bg="#fff6ea" border="2px solid #174ea1">
                <a href="https://forms.gle/Rgm933nyqJovdr4DA" rel="noopener noreferrer" target="_blank">
                  意見やアイデアはこちらから
                  <ArrowUpRight />
                </a>
              </Button>
              <Button variant="secondary" asChild size="xl" color="#174ea1" border="2px solid #174ea1">
                <a href="https://note.com/gen_supporter/n/nbefe0a67e567" rel="noopener noreferrer" target="_blank">
                  全員市長詳細
                  <ArrowUpRight />
                </a>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box
        bg="#F1F6F8"
        py={{ base: "6", md: "10" }}
        px={{ base: "6", md: "12" }}
      >
        <Flex
          bg="white"
          py="8"
          px="8"
          borderRadius="3xl"
          maxW="1024px"
          mx="auto"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={{ base: "center", lg: "flex-end" }}
          gap="8"
        >
          <Image
            src="/kouchou-ai/images/kouchouai-logo.svg"
            alt="広聴AI すべての声が社会を動かす力になる。"
            width={256}
            height={102}
          />
          <Flex flexDirection="column" gap={{ base: "4" }}>
            <Text textStyle="body/sm">
              広聴AIは、デジタル民主主義2030プロジェクトから生まれたオープンソース（OSS）アプリケーションです。
              <Box as="br" display={{ base: "none", lg: "inline" }} />
              本ページは、そのOSS成果物を活用して構築されています。
            </Text>
            <Flex gap="3">
              <Button variant="secondary" asChild>
                <a href="https://dd2030.org/kouchou-ai" target="_blank" rel="noopener noreferrer">
                  広聴AIについて
                  <ArrowUpRight />
                </a>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      
      <Box bg="white" py={{ base: "6", lg: "4" }} px={{ base: "6", md: "12" }} textAlign="center">
        <Flex
          maxW="1024px"
          mx="auto"
          justifyContent={{ lg: "space-between" }}
          alignItems={{ base: "center" }}
          flexDirection={{ base: "column-reverse", lg: "row" }}
          gap={{ base: "4" }}
        >
          <Text display="flex" color="gray.500" textStyle="body/sm">
            © 2025 デジタル民主主義2030
            <Box as="span" mx="0.4em" display={{ base: "none", lg: "inline" }}>
              |
            </Box>
            <Box as="br" display={{ base: "inline", lg: "none" }} />
            レポート内容はレポーターに帰属します
          </Text>
          <Flex gap="0" alignItems="center" color="gray.800">
            {meta.termsLink && (
              <Button variant="ghost" asChild>
                <a href={meta.termsLink} target="_blank" rel="noopener noreferrer">
                  利用規約
                </a>
              </Button>
            )}
            <Dialog title="免責" trigger={<Button variant="ghost">免責</Button>}>
              このレポート内容に関する質問や意見はレポート発行責任者へお問い合わせください。
              <br />
              大規模言語モデル（LLM）にはバイアスがあり、信頼性の低い結果を生成することが知られています。私たちはこれらの問題を軽減する方法に積極的に取り組んでいますが、現段階ではいかなる保証も提供することはできません。特に重要な決定を下す際は、本アプリの出力結果のみに依存せず、必ず内容を検証してください。
            </Dialog>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
