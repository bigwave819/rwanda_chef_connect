"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { useAddProfile } from "@/hooks/useProfile"

const AddProfile = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    bio: "",
    email: "",
  })

  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  const { mutate, isPending } = useAddProfile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(files)
    setPreviews(files.map(f => URL.createObjectURL(f)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (images.length === 0) {
      setError("At least one image is required")
      return
    }

    if (images.length > 2) {
      setError("Maximum 2 images allowed")
      return
    }

    const fd = new FormData()
    fd.append("username", formData.username)
    fd.append("phone", formData.phone)
    fd.append("bio", formData.bio)
    fd.append("email", formData.email)

    images.forEach(img => fd.append("image", img))

    mutate(fd, {
      onSuccess: () => {
        setOpen(false)
        setFormData({ username: "", phone: "", bio: "", email: "" })
        setImages([])
        setPreviews([])
      },
      onError: (err: any) => {
        setError(err?.response?.data?.message || "Failed to create profile")
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Profile</DialogTitle>
        </DialogHeader>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" name="username" onChange={handleChange} placeholder="Username" required />
          <input className="input" name="bio" onChange={handleChange} placeholder="Bio" required />
          <input className="input" name="phone" onChange={handleChange} placeholder="Phone" required />
          <input className="input" name="email" onChange={handleChange} placeholder="Email" required />
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />

          <div className="flex gap-2">
            {previews.map((src, i) => (
              <img key={i} src={src} className="w-20 h-20 rounded" />
            ))}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Uploading..." : "Create Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProfile
