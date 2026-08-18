#!/usr/bin/env node

// ==================================================
// IMPORTS
// ==================================================

import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
  rmSync,
  readFileSync,
  writeFileSync
} from "fs";

import {
  join,
  resolve,
  dirname
} from "path";

import {
  homedir
} from "os";

import {
  execSync
} from "child_process";

import {
  fileURLToPath
} from "url";

// ==================================================
// ES MODULE __dirname FIX
// ==================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ==================================================
// COMMAND LINE ARGUMENTS
//
// Usage:
//
// node bin/cli.js project-name
//
// node bin/cli.js project-name destination database orm auth validation
//
// Example:
//
// node bin/cli.js my-api "" mysql prisma true true
//
// ==================================================

const projectName = process.argv[2];

const customDestination =
  process.argv[3] &&
  process.argv[3].trim() !== ""
    ? process.argv[3]
    : null;

const database = (
  process.argv[4] || "mysql"
).toLowerCase();

const orm = (
  process.argv[5] || "prisma"
).toLowerCase();

const authentication =
  process.argv[6] !== "false";

const validation =
  process.argv[7] !== "false";

// ==================================================
// VALID OPTIONS
// ==================================================

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

// ==================================================
// PROJECT NAME VALIDATION
// ==================================================

if (!projectName) {
  console.log("");
  console.log("❌ Please provide a project name.");
  console.log("");

  console.log("Example:");
  console.log("");

  console.log(
    "node bin/cli.js my-project"
  );

  console.log("");

  process.exit(1);
}

if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
  console.log("");
  console.log("❌ Invalid project name.");
  console.log("");

  console.log(
    "Only letters, numbers, hyphen (-) and underscore (_) are allowed."
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// DATABASE VALIDATION
// ==================================================

if (!validDatabases.includes(database)) {
  console.log("");
  console.log(
    `❌ Invalid database: ${database}`
  );

  console.log("");

  console.log(
    "Available databases:"
  );

  console.log(
    "MySQL, PostgreSQL, MongoDB, SQLite"
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// ORM VALIDATION
// ==================================================

if (!validOrms.includes(orm)) {
  console.log("");
  console.log(
    `❌ Invalid ORM: ${orm}`
  );

  console.log("");

  console.log(
    "Available ORMs:"
  );

  console.log(
    "Prisma, Drizzle"
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// DATABASE + ORM COMPATIBILITY
// ==================================================

if (
  database === "mongodb" &&
  orm === "drizzle"
) {
  console.log("");
  console.log(
    "❌ MongoDB + Drizzle is not supported by this generator."
  );

  console.log("");

  console.log(
    "Please select Prisma when using MongoDB."
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// DESKTOP PATH
// ==================================================

function getDesktopPath() {
  const homeDirectory =
    homedir();

  const oneDriveDesktop =
    join(
      homeDirectory,
      "OneDrive",
      "Desktop"
    );

  const normalDesktop =
    join(
      homeDirectory,
      "Desktop"
    );

  if (
    existsSync(
      oneDriveDesktop
    )
  ) {
    return oneDriveDesktop;
  }

  return normalDesktop;
}

// ==================================================
// DESTINATION DIRECTORY
// ==================================================

const destinationDirectory =
  customDestination
    ? resolve(customDestination)
    : getDesktopPath();

// ==================================================
// PROJECT PATH
// ==================================================

const projectPath =
  join(
    destinationDirectory,
    projectName
  );

// ==================================================
// TEMPLATE PATH
// ==================================================

const templatePath =
  join(
    __dirname,
    "..",
    "templates"
  );

// ==================================================
// EXISTING PROJECT CHECK
// ==================================================

if (
  existsSync(
    projectPath
  )
) {
  console.log("");
  console.log(
    `❌ Project "${projectName}" already exists.`
  );

  console.log("");

  console.log(
    `📁 Location: ${projectPath}`
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// TEMPLATE CHECK
// ==================================================

if (
  !existsSync(
    templatePath
  )
) {
  console.log("");
  console.log(
    "❌ Templates folder not found."
  );

  console.log("");

  console.log(
    `Expected: ${templatePath}`
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// HEADER
// ==================================================

console.log("");

console.log(
  "========================================"
);

console.log(
  "🚀 FAIZ BACKEND GENERATOR"
);

console.log(
  "========================================"
);

console.log("");

console.log(
  `📦 Project: ${projectName}`
);

console.log(
  `📍 Location: ${projectPath}`
);

console.log(
  `🗄️ Database: ${database}`
);

console.log(
  `🔧 ORM: ${orm}`
);

console.log(
  `🔐 Authentication: ${
    authentication
      ? "Enabled"
      : "Disabled"
  }`
);

console.log(
  `✅ Validation: ${
    validation
      ? "Enabled"
      : "Disabled"
  }`
);

console.log("");

// ==================================================
// CREATE DIRECTORY
// ==================================================

function createDirectory(directory) {
  mkdirSync(
    directory,
    {
      recursive: true
    }
  );
}

// ==================================================
// COPY DIRECTORY
// ==================================================

function copyDirectory(
  source,
  destination
) {
  if (
    !existsSync(source)
  ) {
    throw new Error(
      `Source directory does not exist: ${source}`
    );
  }

  createDirectory(
    destination
  );

  const items =
    readdirSync(source);

  for (
    const item of items
  ) {
    const sourcePath =
      join(
        source,
        item
      );

    const destinationPath =
      join(
        destination,
        item
      );

    const stats =
      statSync(
        sourcePath
      );

    if (
      stats.isDirectory()
    ) {
      copyDirectory(
        sourcePath,
        destinationPath
      );
    } else {
      copyFileSync(
        sourcePath,
        destinationPath
      );
    }
  }
}

// ==================================================
// CREATE BACKEND FOLDERS
// ==================================================

function createEmptyFolders() {
  const folders = [
    "src",

    "src/config",

    "src/constants",

    "src/controllers",

    "src/db",

    "src/middlewares",

    "src/models",

    "src/repositories",

    "src/routes",

    "src/services",

    "src/types",

    "src/utils",

    "src/validations",

    "prisma",

    "tests",

    "uploads",

    "logs"
  ];

  for (
    const folder of folders
  ) {
    createDirectory(
      join(
        projectPath,
        folder
      )
    );
  }
}

// ==================================================
// UPDATE PACKAGE NAME
// ==================================================

function updatePackageName() {
  const packageJsonPath =
    join(
      projectPath,
      "package.json"
    );

  if (
    !existsSync(
      packageJsonPath
    )
  ) {
    throw new Error(
      "package.json not found."
    );
  }

  const packageJson =
    JSON.parse(
      readFileSync(
        packageJsonPath,
        "utf8"
      )
    );

  packageJson.name =
    projectName
      .toLowerCase()
      .replace(
        /\s+/g,
        "-"
      );

  packageJson.description =
    "Generated by Faiz Backend Generator";

  packageJson.main =
    "src/server.js";

  packageJson.type =
    "module";

  packageJson.scripts =
    packageJson.scripts || {};

  packageJson.scripts.dev =
    "nodemon src/server.js";

  packageJson.scripts.start =
    "node src/server.js";

  packageJson.scripts.test =
    packageJson.scripts.test ||
    "jest";

  fsWritePackage(
    packageJsonPath,
    packageJson
  );
}

// ==================================================
// WRITE PACKAGE JSON
// ==================================================

function fsWritePackage(
  packageJsonPath,
  packageJson
) {
  writeFileSync(
    packageJsonPath,
    JSON.stringify(
      packageJson,
      null,
      2
    ) + "\n"
  );
}

// ==================================================
// REMOVE DEPENDENCY
// ==================================================

function removeDependency(
  packageJson,
  packageName
) {
  if (
    packageJson.dependencies
  ) {
    delete packageJson
      .dependencies[
        packageName
      ];
  }

  if (
    packageJson.devDependencies
  ) {
    delete packageJson
      .devDependencies[
        packageName
      ];
  }
}

// ==================================================
// ADD DEPENDENCY
// ==================================================

function addDependency(
  packageJson,
  packageName,
  version
) {
  packageJson.dependencies =
    packageJson.dependencies || {};

  packageJson.dependencies[
    packageName
  ] = version;
}

// ==================================================
// ADD DEV DEPENDENCY
// ==================================================

function addDevDependency(
  packageJson,
  packageName,
  version
) {
  packageJson.devDependencies =
    packageJson.devDependencies || {};

  packageJson.devDependencies[
    packageName
  ] = version;
}

// ==================================================
// DATABASE URL
// ==================================================

function getDatabaseUrl() {
  switch (
    database
  ) {
    case "mysql":
      return "mysql://root:password@localhost:3306/my_database";

    case "postgresql":
      return "postgresql://postgres:password@localhost:5432/my_database";

    case "mongodb":
      return "mongodb://localhost:27017/my_database";

    case "sqlite":
      return "file:./dev.db";

    default:
      return "";
  }
}

// ==================================================
// UPDATE ENVIRONMENT
// ==================================================

function updateEnvironmentFile() {
  const envExamplePath =
    join(
      projectPath,
      ".env.example"
    );

  let envContent = "";

  if (
    existsSync(
      envExamplePath
    )
  ) {
    envContent =
      readFileSync(
        envExamplePath,
        "utf8"
      );
  }

  const databaseUrl =
    getDatabaseUrl();

  const databaseLine =
    `DATABASE_URL="${databaseUrl}"`;

  if (
    envContent.match(
      /^DATABASE_URL=.*$/m
    )
  ) {
    envContent =
      envContent.replace(
        /^DATABASE_URL=.*$/m,
        databaseLine
      );
  } else {
    envContent +=
      `\n${databaseLine}\n`;
  }

  if (
    !envContent.match(
      /^PORT=.*$/m
    )
  ) {
    envContent +=
      "\nPORT=5000\n";
  }

  if (
    !envContent.match(
      /^JWT_SECRET=.*$/m
    )
  ) {
    envContent +=
      "\nJWT_SECRET=change_this_secret\n";
  }

  if (
    !envContent.match(
      /^NODE_ENV=.*$/m
    )
  ) {
    envContent +=
      "\nNODE_ENV=development\n";
  }

  writeFileSync(
    envExamplePath,
    envContent
  );
}

// ==================================================
// CONFIGURE PRISMA
// ==================================================

function configurePrisma() {
  const prismaDirectory =
    join(
      projectPath,
      "prisma"
    );

  createDirectory(
    prismaDirectory
  );

  const schemaPath =
    join(
      prismaDirectory,
      "schema.prisma"
    );

  let provider =
    "mysql";

  if (
    database === "postgresql"
  ) {
    provider =
      "postgresql";
  }

  if (
    database === "mongodb"
  ) {
    provider =
      "mongodb";
  }

  if (
    database === "sqlite"
  ) {
    provider =
      "sqlite";
  }

  let idField = `
  id        Int      @id @default(autoincrement())
`;

  if (
    database === "mongodb"
  ) {
    idField = `
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
`;
  }

  const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${provider}"
  url      = env("DATABASE_URL")
}

model User {
${idField}
  name      String

  email     String   @unique

  password  String

  createdAt DateTime @default(now())

  updatedAt DateTime @updatedAt
}
`;

  writeFileSync(
    schemaPath,
    schema
  );
}

// ==================================================
// CONFIGURE DRIZZLE
// ==================================================

function configureDrizzle() {
  const prismaDirectory =
    join(
      projectPath,
      "prisma"
    );

  if (
    existsSync(
      prismaDirectory
    )
  ) {
    rmSync(
      prismaDirectory,
      {
        recursive: true,
        force: true
      }
    );
  }

  const drizzleDirectory =
    join(
      projectPath,
      "drizzle"
    );

  createDirectory(
    drizzleDirectory
  );

  let schemaContent =
    "";

  // ------------------------------------------------
  // MYSQL
  // ------------------------------------------------

  if (
    database === "mysql"
  ) {
    schemaContent = `import {
  mysqlTable,
  int,
  varchar,
  timestamp
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id")
    .autoincrement()
    .primaryKey(),

  name: varchar("name", {
    length: 255
  }).notNull(),

  email: varchar("email", {
    length: 255
  }).notNull()
    .unique(),

  password: varchar("password", {
    length: 255
  }).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull()
});
`;
  }

  // ------------------------------------------------
  // POSTGRESQL
  // ------------------------------------------------

  if (
    database === "postgresql"
  ) {
    schemaContent = `import {
  pgTable,
  serial,
  varchar,
  timestamp
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id")
    .primaryKey(),

  name: varchar("name", {
    length: 255
  }).notNull(),

  email: varchar("email", {
    length: 255
  }).notNull()
    .unique(),

  password: varchar("password", {
    length: 255
  }).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull()
});
`;
  }

  // ------------------------------------------------
  // SQLITE
  // ------------------------------------------------

  if (
    database === "sqlite"
  ) {
    schemaContent = `import {
  sqliteTable,
  integer,
  text
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id")
    .primaryKey({
      autoIncrement: true
    }),

  name: text("name")
    .notNull(),

  email: text("email")
    .notNull()
    .unique(),

  password: text("password")
    .notNull()
});
`;
  }

  const schemaPath =
    join(
      drizzleDirectory,
      "schema.js"
    );

  writeFileSync(
    schemaPath,
    schemaContent
  );

  // ------------------------------------------------
  // DRIZZLE DIALECT
  // ------------------------------------------------

  let dialect =
    "mysql";

  if (
    database === "postgresql"
  ) {
    dialect =
      "postgresql";
  }

  if (
    database === "sqlite"
  ) {
    dialect =
      "sqlite";
  }

  let credentials = "";

  if (
    database === "sqlite"
  ) {
    credentials = `
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
`;
  } else {
    credentials = `
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
`;
  }

  const configContent =
`import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.js",
  out: "./drizzle/migrations",
  dialect: "${dialect}",
${credentials}
});
`;

  writeFileSync(
    join(
      projectPath,
      "drizzle.config.js"
    ),
    configContent
  );
}

// ==================================================
// CONFIGURE DATABASE + ORM
// ==================================================

function configureDatabase() {
  const packageJsonPath =
    join(
      projectPath,
      "package.json"
    );

  const packageJson =
    JSON.parse(
      readFileSync(
        packageJsonPath,
        "utf8"
      )
    );

  // ------------------------------------------------
  // REMOVE OLD DATABASE PACKAGES
  // ------------------------------------------------

  const packagesToRemove = [
    "@prisma/client",
    "prisma",
    "drizzle-orm",
    "drizzle-kit",
    "mysql2",
    "pg",
    "better-sqlite3"
  ];

  for (
    const packageName
      of packagesToRemove
  ) {
    removeDependency(
      packageJson,
      packageName
    );
  }

  // ------------------------------------------------
  // PRISMA
  // ------------------------------------------------

  if (
    orm === "prisma"
  ) {
    addDependency(
      packageJson,
      "@prisma/client",
      "^6.15.0"
    );

    addDevDependency(
      packageJson,
      "prisma",
      "^6.15.0"
    );

    configurePrisma();

    packageJson.scripts =
      packageJson.scripts || {};

    packageJson.scripts[
      "prisma:generate"
    ] =
      "prisma generate";

    packageJson.scripts[
      "prisma:push"
    ] =
      "prisma db push";
  }

  // ------------------------------------------------
  // DRIZZLE
  // ------------------------------------------------

  if (
    orm === "drizzle"
  ) {
    addDependency(
      packageJson,
      "drizzle-orm",
      "^0.44.4"
    );

    addDevDependency(
      packageJson,
      "drizzle-kit",
      "^0.31.4"
    );

    if (
      database === "mysql"
    ) {
      addDependency(
        packageJson,
        "mysql2",
        "^3.14.3"
      );
    }

    if (
      database === "postgresql"
    ) {
      addDependency(
        packageJson,
        "pg",
        "^8.16.3"
      );
    }

    if (
      database === "sqlite"
    ) {
      addDependency(
        packageJson,
        "better-sqlite3",
        "^12.2.0"
      );
    }

    configureDrizzle();

    packageJson.scripts =
      packageJson.scripts || {};

    packageJson.scripts[
      "db:generate"
    ] =
      "drizzle-kit generate";

    packageJson.scripts[
      "db:migrate"
    ] =
      "drizzle-kit migrate";
  }

  // ------------------------------------------------
  // WRITE PACKAGE
  // ------------------------------------------------

  fsWritePackage(
    packageJsonPath,
    packageJson
  );
}

// ==================================================
// CONFIGURE AUTHENTICATION
// ==================================================

function configureAuthentication() {
  const packageJsonPath =
    join(
      projectPath,
      "package.json"
    );

  const packageJson =
    JSON.parse(
      readFileSync(
        packageJsonPath,
        "utf8"
      )
    );

  if (
    authentication
  ) {
    addDependency(
      packageJson,
      "jsonwebtoken",
      "^9.0.2"
    );

    addDependency(
      packageJson,
      "bcryptjs",
      "^3.0.2"
    );
  } else {
    removeDependency(
      packageJson,
      "jsonwebtoken"
    );

    removeDependency(
      packageJson,
      "bcryptjs"
    );
  }

  fsWritePackage(
    packageJsonPath,
    packageJson
  );
}

// ==================================================
// CONFIGURE VALIDATION
// ==================================================

function configureValidation() {
  const packageJsonPath =
    join(
      projectPath,
      "package.json"
    );

  const packageJson =
    JSON.parse(
      readFileSync(
        packageJsonPath,
        "utf8"
      )
    );

  if (
    validation
  ) {
    addDependency(
      packageJson,
      "zod",
      "^3.25.76"
    );
  } else {
    removeDependency(
      packageJson,
      "zod"
    );
  }

  fsWritePackage(
    packageJsonPath,
    packageJson
  );
}

// ==================================================
// MAIN
// ==================================================

try {
  // ------------------------------------------------
  // CREATE PROJECT
  // ------------------------------------------------

  console.log(
    "📁 Creating project folder..."
  );

  createDirectory(
    projectPath
  );

  console.log(
    "✅ Project folder created"
  );

  console.log("");

  // ------------------------------------------------
  // FOLDER STRUCTURE
  // ------------------------------------------------

  console.log(
    "📂 Creating folder structure..."
  );

  createEmptyFolders();

  console.log(
    "✅ Folder structure created"
  );

  console.log("");

  // ------------------------------------------------
  // COPY TEMPLATES
  // ------------------------------------------------

  console.log(
    "📄 Copying backend templates..."
  );

  copyDirectory(
    templatePath,
    projectPath
  );

  console.log(
    "✅ Backend files copied"
  );

  console.log("");

  // ------------------------------------------------
  // PACKAGE.JSON
  // ------------------------------------------------

  console.log(
    "⚙️ Configuring package.json..."
  );

  updatePackageName();

  console.log(
    "✅ package.json configured"
  );

  console.log("");

  // ------------------------------------------------
  // DATABASE
  // ------------------------------------------------

  console.log(
    "🗄️ Configuring database..."
  );

  configureDatabase();

  console.log(
    `✅ ${database.toUpperCase()} + ${orm.toUpperCase()} configured`
  );

  console.log("");

  // ------------------------------------------------
  // AUTHENTICATION
  // ------------------------------------------------

  console.log(
    "🔐 Configuring authentication..."
  );

  configureAuthentication();

  if (
    authentication
  ) {
    console.log(
      "✅ JWT Authentication enabled"
    );
  } else {
    console.log(
      "⏭️ JWT Authentication disabled"
    );
  }

  console.log("");

  // ------------------------------------------------
  // VALIDATION
  // ------------------------------------------------

  console.log(
    "✅ Configuring validation..."
  );

  configureValidation();

  if (
    validation
  ) {
    console.log(
      "✅ Zod Validation enabled"
    );
  } else {
    console.log(
      "⏭️ Zod Validation disabled"
    );
  }

  console.log("");

  // ------------------------------------------------
  // ENVIRONMENT
  // ------------------------------------------------

  console.log(
    "🌱 Configuring environment..."
  );

  updateEnvironmentFile();

  console.log(
    "✅ Environment configured"
  );

  console.log("");

  // ------------------------------------------------
  // INSTALL DEPENDENCIES
  // ------------------------------------------------

  console.log(
    "📦 Installing dependencies..."
  );

  console.log("");

  execSync(
    "npm install",
    {
      cwd: projectPath,
      stdio: "inherit"
    }
  );

  console.log("");

  // ------------------------------------------------
  // SUCCESS
  // ------------------------------------------------

  console.log(
    "========================================"
  );

  console.log(
    "🎉 BACKEND CREATED SUCCESSFULLY!"
  );

  console.log(
    "========================================"
  );

  console.log("");

  console.log(
    `📦 Project: ${projectName}`
  );

  console.log(
    `📍 Location: ${projectPath}`
  );

  console.log(
    `🗄️ Database: ${database}`
  );

  console.log(
    `🔧 ORM: ${orm}`
  );

  console.log(
    `🔐 Authentication: ${
      authentication
        ? "Enabled"
        : "Disabled"
    }`
  );

  console.log(
    `✅ Validation: ${
      validation
        ? "Enabled"
        : "Disabled"
    }`
  );

  console.log("");

  // ------------------------------------------------
  // NEXT STEPS
  // ------------------------------------------------

  console.log(
    "➡️ Next steps:"
  );

  console.log("");

  console.log(
    `cd "${projectPath}"`
  );

  console.log(
    "copy .env.example .env"
  );

  if (
    orm === "prisma"
  ) {
    console.log(
      "npm run prisma:generate"
    );

    console.log(
      "npm run prisma:push"
    );
  }

  if (
    orm === "drizzle"
  ) {
    console.log(
      "npm run db:generate"
    );

    console.log(
      "npm run db:migrate"
    );
  }

  console.log(
    "npm run dev"
  );

  console.log("");

  console.log(
    "🚀 Happy coding!"
  );

  console.log("");

} catch (error) {
  console.log("");

  console.log(
    "========================================"
  );

  console.log(
    "❌ PROJECT CREATION FAILED"
  );

  console.log(
    "========================================"
  );

  console.log("");

  console.error(
    error.stack || error.message
  );

  console.log("");

  // ------------------------------------------------
  // CLEANUP FAILED PROJECT
  // ------------------------------------------------

  if (
    existsSync(
      projectPath
    )
  ) {
    try {
      rmSync(
        projectPath,
        {
          recursive: true,
          force: true
        }
      );

      console.log(
        "🧹 Failed project folder removed."
      );
    } catch {
      console.log(
        "⚠️ Could not remove failed project folder."
      );
    }
  }

  console.log("");

  process.exit(1);
}