import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from 'markdown-it'
import { Skeleton } from "@/app/components/ui/skeleton";
import View from "@/app/components/View";
import StartupCard, { StartupTypeCard } from "@/app/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  

  const [post, editorPostsResponse ] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const editorPosts = editorPostsResponse?.select;

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className=" w-full bg-rose-500  pattern flex justify-center items-center flex-col py-10 px-6 !min-h-[230px]">
        <p className=" bg-pink-300 px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">{formatDate(post?._createdAt)}</p>

        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">{post.title}</h1>
        <p className="font-medium text-[20px] text-white  text-center break-words !max-w-5xl">{post.description}</p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="font-medium text-[20px] text-black">{post.author.name}</p>
                <p className="font-medium text-[20px] text-black !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full">{post.category}</p>
          </div>

          <h3 className=" text-[30px] font-bold text-black">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-black-100 text-sm font-normal">No details provided</p>
          )}
        </div>

        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-[30px] font-extrabold text-white">Editor Picks</p>

            <ul className="mt-7  grid sm:grid-cols-2 gap-5">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className=" bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;