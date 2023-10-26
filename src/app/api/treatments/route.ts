import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import Treamtent from "@/models/treatmentsSchema";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();
    const { imageCover, price, description, title } = reqBody;

    const newTreatment = new Treamtent({
      title,
      description,
      price,
      imageCover,
    });
    await newTreatment.save();

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        treatments: newTreatment,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const product = await Treamtent.find();

    if (!product) {
      throw new Error("Document not found");
    }

    return NextResponse.json({
      status: 200,
      success: true,
      product: product,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const reqBody = await req.json();

    const title: string = reqBody.title;
    const description: string = reqBody.description;
    const price: string = reqBody.price;
    const imageCover: string = reqBody.imageCover;

    const { _id } = await Treamtent.findOne();

    const treatmentValues = await Treamtent.updateOne(
      {
        _id,
      },
      {
        $set: {
          title: title,
          description: description,
          price: price,
          imageCover: imageCover,
        },
      }
    );

    return NextResponse.json({
      status: 200,
      success: true,
      data: {
        treatment: treatmentValues,
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 400,
      body: {
        success: false,
        error: error.message,
      },
    });
  }
}

export async function DELETE(req: NextRequest) {
    try {
      await connectToDatabase();
  
      const { id } = await req.json();
      console.log("Received id:", id);
      const deletedTreatment = await Treamtent.findByIdAndDelete(id);
  
      if (!deletedTreatment) {
        return NextResponse.json({
          status: 404,
          success: false,
          error: "Treatment not found",
        });
      }
  
      return NextResponse.json({
        status: 200,
        success: true,
        data: {
          message: "Treatment deleted successfully",
        },
      });
    } catch (error: any) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: error.message,
      });
    }
  }
  