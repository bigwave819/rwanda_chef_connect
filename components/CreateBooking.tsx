'use client'

import { useBooking } from '@/hooks/useBooking'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Spinner } from './ui/spinner'

interface ChefNameProps {
  name: string
  bookedUserId: string
}
// Zod schema
const bookingFormSchema = z.object({
  service: z.string().min(1, "Description is required"),
  date: z.date().refine(date => date >= new Date(), "Date cannot be in the past")
})

type BookingFormValues = z.infer<typeof bookingFormSchema>

const CreateBooking = ({ name, bookedUserId }: ChefNameProps) => {
  const { createBooking, isCreatingBooking } = useBooking()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      service: '',
      date: new Date(),
    },
  })

  const onSubmit = (values: BookingFormValues) => {
    createBooking.mutate(
      { service: values.service, date: values.date.toISOString(), bookedUserId },
      {
        onSuccess: () => {
          form.reset()
          alert('Booking created successfully!')
        },
      }
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='btn'>Book {name}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Book {name} Here</DialogTitle>

        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Service Description */}
          <div className='space-y-2'>
            <label className='label'>Description</label>
            <input
              placeholder='Enter the event Description'
              className='input'
              {...form.register('service')}
            />
            {form.formState.errors.service && (
              <p className='text-red-500 text-sm'>{form.formState.errors.service.message}</p>
            )}
          </div>

          {/* Date Picker */}
          <div className='space-y-2'>
            <label className='label'>Date</label>
            <Controller
              control={form.control}
              name='date'
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className={cn(
                        'w-full text-left',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? format(field.value, 'PPP') : 'Select a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()} // disable past dates
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {form.formState.errors.date && (
              <p className='text-red-500 text-sm'>{form.formState.errors.date.message}</p>
            )}
          </div>

          <Button type='submit' className='w-full'>
            {isCreatingBooking ? <Spinner/> : `Book ${name}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateBooking
