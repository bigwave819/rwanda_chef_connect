'use server'


// ***********    the Chef Actions     **********

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


// create the chef 

export async function createTheChef(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const speciality = formData.get("speciality") as string;
        const imageUrl = formData.get("imageUrl") as string;

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

    } catch (error: any) {
        console.error("Error creating chef:", error);
        return { 
            success: false, 
            error: error.message || "Failed to create chef" 
        };
    }
}

// get all the chef for the admin and the normal users
export async function getTheChefs(query?: string) {
  try {
    const chefs = await prisma.chef.findMany({
      where: query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { speciality: { contains: query, mode: "insensitive" } },
            ],
          }
        : {},
      orderBy: { createdAt: "desc" },
    });

    return chefs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get the single chef for the admin and the single user
export async function getSingleChief(id: string) {
    try {
        const project = await prisma.chef.findUnique({
            where: { id }
        })
        return project
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
  try {
    const total = await prisma.chef.count();
    return { success: true, total };
  } catch (error) {
    console.error("Error fetching total chiefs:", error);
    return { success: false, total: 0 };
  }
}

// ***********    the protocol Actions     **********

// create the protocols 
export async function createProtocol(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const number = formData.get("number") as string;
        const imageUrl = formData.get("imageUrl") as string;

        if (!name || !number || !imageUrl) {
            throw new Error("All fields are required");
        }

        const protocol = await prisma.protocol.create({
            data: { name, number, imageUrl },
        });

        revalidatePath('/admin/protocol')

        return { success: true, protocol };

    } catch (error) {
        console.error("Error creating chef:", error);
        return { success: false, error: "Failed to create chef" };
    }
}


// get all the protocols for the admin and the normal users

export async function getAllProtocols(query?: string) {
  try {
    return await prisma.protocol.findMany({
      where: query
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            },
          }
        : {},
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}



// get the single protocols for the admin and the single user
export async function getSingleProtocol(id: string) {
  try {
    const protocol = await prisma.protocol.findUnique({
      where: { id }
    })
    return protocol
  } catch (error) {
    console.error(error)
    return null
  }
}

// update the protocols
export async function updateSingleProtocol() {

}

// get the tottal protocols
export async function getTotalProtocol() {
    try {
    const total = await prisma.protocol.count();
    return { success: true, total };
  } catch (error) {
    console.error("Error fetching total protocol:", error);
    return { success: false, total: 0 };
  }
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