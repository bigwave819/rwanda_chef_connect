'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { useState } from "react"


const AddProtocols = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => { }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn">Add Chief +</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ADD THE CHEF</DialogTitle>
        </DialogHeader>
        <div>
          <form 
            // onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <label className="label">Chef Name</label>
              <input
                type="text"
                // {...register("name")}
                className="input"
                placeholder="Names"
              />
              
            </div>
            <div className="space-y-3">
              <label className="label">Speciality</label>
              <input
                // {...register("speciality")}
                type="text"
                className="input"
                placeholder="Speciality"
              />

            </div>
            <div className="space-y-3">
              <label className="label">Image</label>
              <input
                accept="image/*"
                className="input"
                // onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />

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

export default AddProtocols