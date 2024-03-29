import Editor from "rich-markdown-editor";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "../../../utils/axios";

// context
import { MediaContext } from "../../../context/Media";
import { ThemeContext } from '../../../context/Theme';

// components
import UserLayout from "../../../components/layout/UserLayout";
import { ArrowUpTrayIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../components/Buttons";
import { uploadImage } from "../../../functions/upload";
import { loadTags } from "../../../functions/load";
import { ErrorBanner, SuccessBanner } from "../../../components/Banner";
import localData from "../../../utils/localData";
import MediaModal from "../../../components/media/MediaModal";


import YouTubeEmbed from '../../../components/embed/YoutubeEmbed';

export default function CreatePostPage() {
  const [theme, setTheme] = useContext(ThemeContext);
  const [media, setMedia] = useContext(MediaContext);
  const router = useRouter();

  const [title, setTitle] = useState(localData('postTitle') || "");
  const [content, setContent] = useState(localData('postContent') || "");
  const [tags, setTags] = useState(localData("tags") || []);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [featuredImage, setFeaturedImage] = useState(localData("featuredImage") || "");

  const resetFields = () => {
    localStorage.removeItem("postTitle");
    localStorage.removeItem("postContent");
    localStorage.removeItem("categories");
    localStorage.removeItem("postFeaturedImage");
    setMedia({ ...media, selected: "" });
  };

  useEffect(() => {
    if (media.selected) {
      localStorage.setItem("postFeaturedImage", JSON.stringify(media.selected));
    }
  }, [media.selected]);

  // publish post
  const publishPost = async () => {
    const tagsArray = tags?.split(",").map(tag => tag.trim().toLowerCase());
    axios.post('/posts/create', { title, content, tags: tagsArray, isPublished: true, featuredImage: featuredImage._id || "" })
      .then(res => {
        console.log(res.data);
        setSuccess(res.data.message);
        resetFields();
        router.push("/user/posts");
      })
      .catch(err => { console.log(err); setError(err.response.data.message || err.response.data.errors[0]); });
  };

  // save post as draft
  const savePost = async () => {
    console.table({ title, content, categories, featuredImage: featuredImage ? featuredImage._id : "", isPublished: false });
    // await axios.post('/posts/create-post', { title, content, categories: categories, featuredImage: featuredImageURL ? featuredImage : "", isPublished: false });
  };

  return (
    <>
      {/* Head for the page */}
      <Head>
        <title>
          Create Post | Learnr
        </title>
      </Head>
      {/* End of Head */}
      <UserLayout>
        <MediaModal visible={media.showMediaModal} onClick={() => setMedia({ ...media, showMediaModal: !media.showMediaModal })} />
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3">
            {error && (
              <ErrorBanner message={error} />
            )}
            {success && (
              <SuccessBanner message={success} />
            )}
            <div>
              <h1 className="mb-4 text-xl font-medium">Create a new post</h1>
            </div>
            <div className="mb-8">
              {/* post title */}
              <label htmlFor="postTitle" className="sr-only">
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  localStorage.setItem('postTitle', JSON.stringify(e.target.value));
                }}
                name="postTitle"
                id="postTitle"
                className="block w-full text-lg border-gray-300 rounded-md shadow-sm dark:bg-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Create a post title" required
              />
              {/* post title end */}
            </div>
            <div className='min-h-[500px]'>

              <Editor placeholder="Write something..."
                className='bg-gray-100 dark:bg-gray-900'
                defaultValue={content}
                onChange={(value) => {
                  setContent(value());
                  localStorage.setItem("postContent", JSON.stringify(value()));
                }}
                uploadImage={(file) => uploadImage(file).then(res => res.url)}
                dark={theme == "dark" ? true : false}
                embeds={[
                  {
                    title: 'YouTube',
                    icon: () => <DocumentTextIcon />,
                    keywords: 'youtube video',
                    defaultHidden: false,
                    matcher: (url) => {
                      return url.match(
                        /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
                      );
                    },
                    component: YouTubeEmbed,
                  },
                ]}
              />
            </div>
          </div>
          <div className="w-full mt-5 lg:ml-8 lg:w-1/3">
            <div className="mb-4">
              <label htmlFor="tags" className="text-sm">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                name="tags"
                id="tags"
                className="block w-full text-lg border-gray-300 rounded-md shadow-sm dark:bg-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Machine Learning, Marketing, ... (max 4)" required
              />
            </div>
            {/* image upload preview */}
            {
              (media?.selected || featuredImage) && (
                <div className="my-2 overflow-hidden border border-gray-300 rounded-md shadow-md max-h-64 ">
                  <Image className="object-cover w-full" src={media.selected.url || featuredImage.url} layout="responsive" width={720} height={400} />
                </div>
              )
            }
            {/* image upload preview ends */}
            {/* upload featured image */}
            <div className="mb-4">
              <Button className="w-full my-2" onClick={() => setMedia({ ...media, showMediaModal: true })} icon={<ArrowUpTrayIcon />} text="Add Featured Image" />
            </div>
            {/* upload featured image end */}
            {/* publish button */}
            <div className="flex mt-2">
              <Button text="Publish" onClick={publishPost} />
              <Link href=''>
                <a
                  className="inline-flex items-center px-4 py-2 ml-2 text-sm font-medium border border-transparent rounded-md hover:bg-gray-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save as draft
                </a>
              </Link>
            </div>
            {/* publish button end */}
          </div>
        </div>
      </UserLayout>
    </>
  );
}
