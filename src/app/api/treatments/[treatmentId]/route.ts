import { connectToDatabase } from "@/lib/db";
import Treamtent from "@/models/treatmentsSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { treatmentId: string } }
) {
  try {
    await connectToDatabase();

    const id = params.treatmentId;
    const product = await Treamtent.findById(id);

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { treatmentId: string } }
) {
  try {
    await connectToDatabase();

    const id = params.treatmentId;
    const reqBody = await req.json();

    const title: string = reqBody.title;
    const description: string = reqBody.description;
    const price: string = reqBody.price;
    const imageCover: string = reqBody.imageCover;

    const treatmentValues = await Treamtent.findByIdAndUpdate(id, reqBody, {
      new: true,
      runValidators: true,
    });

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { treatmentId: string } }
) {
  try {
    await connectToDatabase();

    const id = params.treatmentId;
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
