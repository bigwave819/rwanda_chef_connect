'use server'


// ***********    the Chef Actions     **********

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

 
// create the chef 

export async function createTheChef(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const speciality = formData.get("speciality") as string;
        const imageUrl = formData.get("imageUrl") as string; // Fixed: added imageUrl

        if (!name || !speciality || !imageUrl) {
            throw new Error("All fields are required");
        }

        const chef = await prisma.chef.create({
            data: { 
                name, 
                speciality, 
                imageUrl 
            },
        });

        revalidatePath('/admin/chefs')

        return { success: true, chef };

    } catch (error) {
        console.error("Error creating chef:", error);
        return { success: false, error: "Failed to create chef" };
    }
}

// get all the chef for the admin and the normal users
export async function getTheChefs() {
     try {
        const project = await prisma.chef.findMany({
            orderBy: { createdAt: 'desc' }
        })

        return project
    } catch (error) {
        console.error(error);
        return []
    }
}

// get the single chef for the admin and the single user
export async function getSingleChief(id: string) {
     try {
        const project = await prisma.chef.findUnique({
            where: { id }
        })
    } catch (error) {
        console.error(error);
        return []
    }
}

// update the chef
export async function updateChiefs() {
    
}
//get the total chefs
export async function getTotalChiefs() {
    
}

// ***********    the protocol Actions     **********

// create the protocols 
export async function createProtocol() {
    
}

// get all the protocols for the admin and the normal users
export async function getAllProtocols() {
    
}

// get the single protocols for the admin and the single user
export async function getSingleProtocol() {
    
}

// update the protocols
export async function updateSingleProtocol() {
    
}

// get the tottal protocols
export async function getTotalProtocol() {
    
}

/*  ----------------  the booking Actions  ----------- */ 

//create the booking
export async function createTheBookings() {
    
}
// get all bookings
export async function getAllBookings() {
    
}

// get the total bookings
export async function getSingleBookings() {
    
}

// get the bookings by the user Id and render it to them
export async function getBookingById() {
    
}