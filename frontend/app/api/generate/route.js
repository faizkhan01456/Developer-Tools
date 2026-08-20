import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      projectName,
      backend,
      database,
      orm,
      authentication,
      validation,
    } = body;

    if (!projectName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project name is required.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Project configuration received successfully.",

      projectName,
      backend: backend || "express",
      database: database || "mysql",
      orm: orm || "prisma",
      authentication:
        authentication ?? true,
      validation:
        validation ?? true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Generation failed.",
      },
      {
        status: 500,
      }
    );
  }
}