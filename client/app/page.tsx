import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Meta, Report } from "@/type";
import { Box, Card, HStack, Heading, Image, List, Stack, Text, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { getApiBaseUrl } from "./utils/api";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { getBasePath, getRelativeUrl } = await import("@/app/utils/image-src");

    const metadata: Metadata = {
      title: "全員市長",
      description: "仲川げんが掲げた「#全員市長」プロジェクトで集まった意見を集計し、広聴AIによって分析した結果をレポートしていきます。",
      openGraph: {
        images: [getRelativeUrl("/images/logo.png")],
      },
    };

    // 静的エクスポート時はmetadataBaseを設定しない（相対パスを使用するため）
    if (process.env.NEXT_PUBLIC_OUTPUT_MODE !== "export") {
      // 開発環境やSSR時のみmetadataBaseを設定
      const defaultHost = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      metadata.metadataBase = new URL(defaultHost + getBasePath());
    }

    return metadata;
  } catch (_e) {
    console.error("Failed to fetch metadata for generateMetadata:", _e);
    return {
      title: "広聴AI",
    };
  }
}

export default async function Page() {
  try {
    const metaResponse = await fetch(`${getApiBaseUrl()}/meta/metadata.json`);
    const reportsResponse = await fetch(`${getApiBaseUrl()}/reports`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_PUBLIC_API_KEY || "",
        "Content-Type": "application/json",
      },
    });
    const meta: Meta = await metaResponse.json();
    const reports: Report[] = await reportsResponse.json();
    return (
      <>
        <div className={"container"}>
          <Header />
          <Box mx={"auto"} maxW={"1024px"} mb={10}>
            <Stack mb="12" gap={5}>
              <Text>
                このサイトでは、仲川げんが掲げた「#全員市長」プロジェクトで集まった意見を集計し、広聴AIによって分析した結果をレポートしていきます。定期的に分析を行いレポートを更新します。
              </Text>
              <Text>
                分析は、寄せられたコメントから意見を抽出、カテゴリや方向性でグループ分けをします。グループ毎に要約され、また全体に占める割合なども加味して、全体の傾向も示しています。可視化された意見の分布や階層表示からは、全体の傾向だけでなく、一つ一つの意見を見ることもできます。ドットをクリックする、あるいは階層を進んでいくと個別の意見が表示されます。
                
              </Text>
              <Text>広聴AIによる詳しい分析手順については、こちらをご覧ください。</Text>
              <Text fontSize="xs">
                *明らかな誹謗中傷、差別的な言葉や意見などは、フィルタリングされています。
              </Text>
              <List.Root pl={8} fontSize="xs">
                <List.Item color="blue.500">
                  <Link href="https://dd2030.org/kouchou-ai/" target="_blank" rel="noopener noreferrer">
                    デジタル民主主義2030 広聴AI
                  </Link>
                </List.Item>
                <List.Item color="blue.500">
                  <Link href="https://github.com/digitaldemocracy2030/kouchou-ai/" target="_blank" rel="noopener noreferrer">
                    広聴AI GitHub
                  </Link>
                </List.Item>
                <List.Item color="blue.500">
                  <Link href="https://www.docswell.com/s/tokoroten/ZL1M88-2025-06-14-014546/" target="_blank" rel="noopener noreferrer">
                    広聴AI技術解説 ブロードリスニングを支える技術
                  </Link>
                </List.Item>
              </List.Root>
            </Stack>
            <Heading textAlign={"left"} fontSize={"xl"} mb={8}>
              レポート一覧
            </Heading>
            {reports.length === 0 ? (
              <EmptyState />
            ) : (
              reports.map((report) => (
                <Link key={report.slug} href={`/${report.slug}`}>
                  <Card.Root
                    size="md"
                    key={report.slug}
                    mb={4}
                    borderLeftWidth={10}
                    borderLeftColor={meta.brandColor || "#2577b1"}
                    cursor={"pointer"}
                    className={"shadow"}
                  >
                    <Card.Body>
                      <HStack>
                        <Box>
                          <Card.Title>
                            <Text fontSize={"lg"} color={"#2577b1"} mb={1} lineClamp="2">
                              {report.title}
                            </Text>
                          </Card.Title>
                          {report.createdAt && (
                            <Text fontSize={"xs"} color={"gray.500"} mb={1}>
                              作成日時: {new Date(report.createdAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
                            </Text>
                          )}
                          <Card.Description lineClamp={{ base: 3, md: 2 }}>{report.description || ""}</Card.Description>
                        </Box>
                      </HStack>
                    </Card.Body>
                  </Card.Root>
                </Link>
              ))
            )}
          </Box>
        </div>
        <Footer meta={meta} />
      </>
    );
  } catch (_e) {
    return (
      <p>
        エラー：データの取得に失敗しました
        <br />
        Error: fetch failed to {process.env.NEXT_PUBLIC_API_BASEPATH}.
      </p>
    );
  }
}

const EmptyState = () => {
  return (
    <VStack mt={8} mb={12} gap={0} lineHeight={2}>
      <Text fontSize="18px" fontWeight="bold">
        レポートが0件です
      </Text>
      <Text fontSize="14px" textAlign={{ md: "center" }} mt={5}>
        レポート作成が完了し公開されると、ここに一覧が表示されます。
        <Box as="br" display={{ base: "none", md: "block" }} />
        レポートが公開されるまでしばらくお待ちください。
      </Text>
      <Image src="images/report-empty.png" mt={8} />
    </VStack>
  );
};
