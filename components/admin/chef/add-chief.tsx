'use client'


import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from 'zod'

const ChefSchema = z.object({
    name: z.string().min(5, 'the minimum character is 8'),
    speciality: z.string().min(7, 'the minimum character is 7'),
    imageUrl: z.string().url('invalid Url')
})

type ChefSchemaProps = z.infer<typeof ChefSchema>

const AddChief = () => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChefSchemaProps>({
        resolver: zodResolver(ChefSchema),
    });

    const onSubmit = async () => { }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="btn">Add Chief +</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ADD THE CHEF</DialogTitle>
                </DialogHeader>
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
                            <label className="label">Image</label>
                            <input type="file" {...register("imageUrl")} className="input" />
                            {errors.imageUrl && (
                                <p className="text-red-500 text-sm">Image is required</p>
                            )}
                        </div>
                        <div className="mt-3">
                            <Button className="btn w-full">{loading ? <Spinner /> : 'Add Chief'}</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddChief