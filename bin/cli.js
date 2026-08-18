#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");

// ==================================================
// COMMAND LINE ARGUMENTS
// ==================================================

const projectName = process.argv[2];
const customDestination = process.argv[3];

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
// PROJECT NAME
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

// ==================================================
// PROJECT NAME VALIDATION
// ==================================================

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
    "❌ MongoDB + Drizzle is not supported."
  );

  console.log("");

  console.log(
    "Please select Prisma for MongoDB."
  );

  console.log("");

  process.exit(1);
}

// ==================================================
// DESKTOP PATH
// ==================================================

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

  if (
    fs.existsSync(oneDriveDesktop)
  ) {
    return oneDriveDesktop;
  }

  return normalDesktop;
}

// ==================================================
// DESTINATION
// ==================================================

const destinationDirectory =
  customDestination
    ? path.resolve(customDestination)
    : getDesktopPath();

// ==================================================
// PROJECT PATH
// ==================================================

const projectPath = path.join(
  destinationDirectory,
  projectName
);

// ==================================================
// EXISTING PROJECT
// ==================================================

if (fs.existsSync(projectPath)) {
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
// TEMPLATE PATH
// ==================================================

const templatePath = path.join(
  __dirname,
  "..",
  "templates"
);

if (!fs.existsSync(templatePath)) {
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
  fs.mkdirSync(directory, {
    recursive: true
  });
}

// ==================================================
// COPY DIRECTORY
// ==================================================

function copyDirectory(
  source,
  destination
) {
  if (!fs.existsSync(source)) {
    throw new Error(
      `Source directory does not exist: ${source}`
    );
  }

  createDirectory(destination);

  const items = fs.readdirSync(source);

  for (const item of items) {
    const sourcePath = path.join(
      source,
      item
    );

    const destinationPath = path.join(
      destination,
      item
    );

    const stats = fs.statSync(
      sourcePath
    );

    if (stats.isDirectory()) {
      copyDirectory(
        sourcePath,
        destinationPath
      );
    } else {
      fs.copyFileSync(
        sourcePath,
        destinationPath
      );
    }
  }
}

// ==================================================
// CREATE EMPTY FOLDERS
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

  for (const folder of folders) {
    createDirectory(
      path.join(
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
  const packageJsonPath = path.join(
    projectPath,
    "package.json"
  );

  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(
      "package.json not found."
    );
  }

  const packageJson = JSON.parse(
    fs.readFileSync(
      packageJsonPath,
      "utf8"
    )
  );

  packageJson.name = projectName
    .toLowerCase()
    .replace(/\s+/g, "-");

  fs.writeFileSync(
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
  if (packageJson.dependencies) {
    delete packageJson.dependencies[
      packageName
    ];
  }

  if (packageJson.devDependencies) {
    delete packageJson.devDependencies[
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
  switch (database) {
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
// ENVIRONMENT
// ==================================================

function updateEnvironmentFile() {
  const envExamplePath = path.join(
    projectPath,
    ".env.example"
  );

  if (!fs.existsSync(envExamplePath)) {
    return;
  }

  let envContent = fs.readFileSync(
    envExamplePath,
    "utf8"
  );

  const databaseUrl =
    getDatabaseUrl();

  if (
    envContent.includes(
      "DATABASE_URL="
    )
  ) {
    envContent = envContent.replace(
      /^DATABASE_URL=.*$/m,
      `DATABASE_URL="${databaseUrl}"`
    );
  } else {
    envContent +=
      `\nDATABASE_URL="${databaseUrl}"\n`;
  }

  fs.writeFileSync(
    envExamplePath,
    envContent
  );
}

// ==================================================
// PRISMA
// ==================================================

function configurePrisma() {
  const prismaDirectory =
    path.join(
      projectPath,
      "prisma"
    );

  createDirectory(
    prismaDirectory
  );

  const schemaPath =
    path.join(
      prismaDirectory,
      "schema.prisma"
    );

  let provider = "mysql";

  if (database === "postgresql") {
    provider = "postgresql";
  }

  if (database === "mongodb") {
    provider = "mongodb";
  }

  if (database === "sqlite") {
    provider = "sqlite";
  }

  let idField = `
  id        Int      @id @default(autoincrement())
`;

  if (database === "mongodb") {
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

  fs.writeFileSync(
    schemaPath,
    schema
  );
}

// ==================================================
// DRIZZLE
// ==================================================

function configureDrizzle() {
  const prismaDirectory =
    path.join(
      projectPath,
      "prisma"
    );

  if (fs.existsSync(prismaDirectory)) {
    fs.rmSync(
      prismaDirectory,
      {
        recursive: true,
        force: true
      }
    );
  }

  const drizzleDirectory =
    path.join(
      projectPath,
      "drizzle"
    );

  createDirectory(
    drizzleDirectory
  );

  let schemaContent = "";

  if (database === "mysql") {
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

  if (database === "postgresql") {
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

  if (database === "sqlite") {
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

  fs.writeFileSync(
    path.join(
      drizzleDirectory,
      "schema.js"
    ),
    schemaContent
  );

  const dialect =
    database === "postgresql"
      ? "postgresql"
      : database === "sqlite"
        ? "sqlite"
        : "mysql";

  const configContent = `import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.js",
  out: "./drizzle/migrations",
  dialect: "${dialect}",
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});
`;

  fs.writeFileSync(
    path.join(
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
    path.join(
      projectPath,
      "package.json"
    );

  const packageJson = JSON.parse(
    fs.readFileSync(
      packageJsonPath,
      "utf8"
    )
  );

  // Remove ORM packages
  removeDependency(
    packageJson,
    "@prisma/client"
  );

  removeDependency(
    packageJson,
    "prisma"
  );

  removeDependency(
    packageJson,
    "drizzle-orm"
  );

  removeDependency(
    packageJson,
    "drizzle-kit"
  );

  removeDependency(
    packageJson,
    "mysql2"
  );

  removeDependency(
    packageJson,
    "pg"
  );

  removeDependency(
    packageJson,
    "better-sqlite3"
  );

  // Prisma
  if (orm === "prisma") {
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
  }

  // Drizzle
  if (orm === "drizzle") {
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

    if (database === "mysql") {
      addDependency(
        packageJson,
        "mysql2",
        "^3.14.3"
      );
    }

    if (database === "postgresql") {
      addDependency(
        packageJson,
        "pg",
        "^8.16.3"
      );
    }

    if (database === "sqlite") {
      addDependency(
        packageJson,
        "better-sqlite3",
        "^12.2.0"
      );
    }

    configureDrizzle();
  }

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(
      packageJson,
      null,
      2
    ) + "\n"
  );
}

// ==================================================
// AUTHENTICATION
// ==================================================

function configureAuthentication() {
  const packageJsonPath =
    path.join(
      projectPath,
      "package.json"
    );

  const packageJson = JSON.parse(
    fs.readFileSync(
      packageJsonPath,
      "utf8"
    )
  );

  if (authentication) {
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

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(
      packageJson,
      null,
      2
    ) + "\n"
  );
}

// ==================================================
// VALIDATION
// ==================================================

function configureValidation() {
  const packageJsonPath =
    path.join(
      projectPath,
      "package.json"
    );

  const packageJson = JSON.parse(
    fs.readFileSync(
      packageJsonPath,
      "utf8"
    )
  );

  if (validation) {
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

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(
      packageJson,
      null,
      2
    ) + "\n"
  );
}

// ==================================================
// MAIN
// ==================================================

try {
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

  console.log(
    "📂 Creating folder structure..."
  );

  createEmptyFolders();

  console.log(
    "✅ Folder structure created"
  );

  console.log("");

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

  console.log(
    "⚙️ Configuring package.json..."
  );

  updatePackageName();

  console.log(
    "✅ package.json configured"
  );

  console.log("");

  console.log(
    "🗄️ Configuring database..."
  );

  configureDatabase();

  console.log(
    `✅ ${database.toUpperCase()} + ${orm.toUpperCase()} configured`
  );

  console.log("");

  console.log(
    "🔐 Configuring authentication..."
  );

  configureAuthentication();

  console.log(
    authentication
      ? "✅ JWT Authentication enabled"
      : "⏭️ JWT Authentication disabled"
  );

  console.log("");

  console.log(
    "✅ Configuring validation..."
  );

  configureValidation();

  console.log(
    validation
      ? "✅ Zod Validation enabled"
      : "⏭️ Zod Validation disabled"
  );

  console.log("");

  console.log(
    "🌱 Configuring environment..."
  );

  updateEnvironmentFile();

  console.log(
    "✅ Environment configured"
  );

  console.log("");

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

  console.log("");

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

  if (orm === "prisma") {
    console.log(
      "npx prisma generate"
    );
  }

  if (orm === "drizzle") {
    console.log(
      "npx drizzle-kit generate"
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
    error.message
  );

  console.log("");

  process.exit(1);
}