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
