'use client'

import { createTheChef } from "@/app/actions/admin-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from 'zod'
import { Spinner } from "../ui/spinner"
import { Button } from "../ui/button"

const ChefSchema = z.object({
    name: z.string().min(5, 'the minimum character is 8'),
    speciality: z.string().min(7, 'the minimum character is 7'),
    phone: z.string().min(10, 'Phone is required'),
    email: z.string().email(),
    imageUrl: z.any(),
})

type ChefSchemaProps = z.infer<typeof ChefSchema>

const EditProfile = () => {

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChefSchemaProps>({
        resolver: zodResolver(ChefSchema),
    });

    //get the cloudinary signature
    async function getCloudinarySignature() {
        const res = await fetch('/api/cloudinary/signture');
        if (!res.ok) throw new Error("Error in fetching the signature")
        return res.json() as Promise<{
            signature: string;
            timestamp: number;
            apiKey: string;
            cloudName: string;
            folder: string;
        }>;
    }

    async function uploadToCloudinary(file: File) {
        const { signature, timestamp, apiKey } = await getCloudinarySignature();

        const imageData = new FormData();
        imageData.append("file", file);
        imageData.append("api_key", apiKey);
        imageData.append("signature", signature);
        imageData.append("timestamp", timestamp.toString());
        imageData.append("folder", 'rwanda-chef');

        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
            method: "POST",
            body: imageData
        });

        const uploadJson = await uploadRes.json();

        if (!uploadJson.secure_url)
            throw new Error("Cloudinary upload failed");

        return uploadJson.secure_url;
    }

    const onSubmit = async (data: ChefSchemaProps) => {
        try {
            setLoading(true);

            // Convert registered imageUrl (file) into actual File object
            const fileInput = document.querySelector(
                'input[type="file"][name="imageUrl"]'
            ) as HTMLInputElement;

            if (!fileInput?.files || fileInput.files.length === 0) {
                throw new Error("Image is required");
            }

            const file = fileInput.files[0];


            const uploadedUrl = await uploadToCloudinary(file);

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("speciality", data.speciality);
            formData.append("phone", data.phone);
            formData.append("email", data.email);
            formData.append("imageUrl", uploadedUrl);

            const result = await createTheChef(formData)
            if (result?.success) {
                toast.success("Chef added successfully!", {
                    className: "bg-green-600 text-white border-green-700"
                });
                setOpen(false);
                formRef.current?.reset(); // Reset form
            }

        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to add chef");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                    <label className="label">Chef Name</label>
                    <input
                        type="text"
                        {...register("name")}
                        className="input"
                        placeholder="Names"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="label">Speciality</label>
                    <input
                        {...register("speciality")}
                        type="text"
                        className="input"
                        placeholder="Speciality"
                    />
                    {errors.speciality && (
                        <p className="text-red-500 text-sm">
                            {errors.speciality.message}
                        </p>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="label">Phone</label>
                    <input
                        type="text"
                        {...register("phone")}
                        className="input"
                        placeholder="Phone number"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-3">
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register("email")}
                        className="input"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="space-y-3">
                    <label className="label">Image</label>
                    <input type="file" {...register("imageUrl")} accept="image/*" className="input" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    {errors.imageUrl && (
                        <p className="text-red-500 text-sm">Image is required</p>
                    )}
                </div>
                <div className="mt-3">
                    <Button className="btn w-full">{loading ? <Spinner /> : 'Add Chief'}</Button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile