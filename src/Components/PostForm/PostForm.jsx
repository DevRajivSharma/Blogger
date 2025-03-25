import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index.js";
import appwriteService from "../../appwrite/database.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            p_title: post?.p_title || "",
            slug: post?.$id || "",
            p_post: post?.p_post || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log(data);
        if (post) {
            const file = data.p_images[0] ? await appwriteService.uploadFile(data.p_images[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.images);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                p_images: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            console.log(data)
            const file = await appwriteService.uploadFile(data.p_images[0]);

            if (file) {
                const fileId = file.$id;
                data.p_images = fileId;
                const dbPost = await appwriteService.createPost({ ...data, user_id: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "p_title") {
                setValue("slug", slugTransform(value.p_title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap md:flex-row sm:flex-col">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("p_title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/*<textarea className={'bg-white text-black p-2 w-full'} {...register("p_post", { required: true })} />*/}
                <RTE label="p_post :" name="p_post" control={control} defaultValue={getValues("p_post")}
                     {...register("p_post", { required: true })}/>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("p_images", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.p_images)}
                            alt={post.p_title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full rounded p-2">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}