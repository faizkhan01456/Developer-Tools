import fs from "fs";
import path from "path";
import os from "os";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

function getDesktopPath() {
  const homeDirectory = os.homedir();

  const oneDriveDesktop = path.join(
    homeDirectory,
    "OneDrive",
    "Desktop"
  );

  const normalDesktop = path.join(
    homeDirectory,
    "Desktop"
  );

  if (fs.existsSync(oneDriveDesktop)) {
    return oneDriveDesktop;
  }

  return normalDesktop;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      projectName,
      database = "mysql",
      orm = "prisma",
      authentication = true,
      validation = true
    } = body;

    if (!projectName?.trim()) {
      return Response.json(
        {
          success: false,
          message: "Project name is required."
        },
        {
          status: 400
        }
      );
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid project name."
        },
        {
          status: 400
        }
      );
    }

    const validDatabases = [
      "mysql",
      "postgresql",
      "mongodb",
      "sqlite"
    ];

    const validOrms = [
      "prisma",
      "drizzle"
    ];

    if (!validDatabases.includes(database)) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid database selected."
        },
        {
          status: 400
        }
      );
    }

    if (!validOrms.includes(orm)) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid ORM selected."
        },
        {
          status: 400
        }
      );
    }

    // MongoDB + Drizzle is not supported
    if (
      database === "mongodb" &&
      orm === "drizzle"
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Drizzle does not support MongoDB. Please select Prisma."
        },
        {
          status: 400
        }
      );
    }

    const generatorRoot = path.resolve(
      process.cwd(),
      ".."
    );

    const cliPath = path.join(
      generatorRoot,
      "bin",
      "cli.js"
    );

    const desktopPath = getDesktopPath();

    const generatedProjectPath = path.join(
      desktopPath,
      projectName
    );

    const result = await execFileAsync(
      process.execPath,
      [
        cliPath,
        projectName,
        desktopPath,
        database,
        orm,
        String(authentication),
        String(validation)
      ],
      {
        cwd: generatorRoot
      }
    );

    return Response.json({
      success: true,
      message:
        "Backend project created successfully.",

      projectName,

      database,

      orm,

      authentication,

      validation,

      path: generatedProjectPath,

      output: result.stdout || ""
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          error.stderr ||
          error.message ||
          "Project generation failed."
      },
      {
        status: 500
      }
    );
  }
}