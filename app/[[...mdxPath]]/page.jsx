import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata, sourceCode } = result;
  // if we define hideCopyPage = true in front matter, we can disable the llm copy page feature for a specific page
  const { hideCopyPage } = metadata;
  return (
    <Wrapper
      toc={toc}
      metadata={metadata}
      sourceCode={hideCopyPage ? "" : sourceCode}
    >
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
