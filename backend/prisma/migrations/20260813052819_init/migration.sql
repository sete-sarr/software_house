-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('CDI', 'CDD', 'FREELANCE', 'STAGE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NEW', 'REVIEWED', 'REJECTED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "features" JSONB,
    "order" INTEGER NOT NULL DEFAULT 0,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon" TEXT,
    "category" TEXT,

    CONSTRAINT "technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "problem" TEXT,
    "solution" TEXT,
    "result" TEXT,
    "coverImage" TEXT,
    "gallery" JSONB,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "order" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT,
    "photo" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_offers" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "location" TEXT,
    "type" "JobType" NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "jobOfferId" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "cvUrl" TEXT NOT NULL,
    "coverLetterUrl" TEXT,
    "portfolioUrl" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "message" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_requests" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "projectType" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "message" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "company" TEXT,
    "content" TEXT NOT NULL,
    "avatar" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTechnology" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectToTechnology_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_slug_key" ON "technologies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "job_offers_slug_key" ON "job_offers"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- CreateIndex
CREATE INDEX "_ProjectToTechnology_B_index" ON "_ProjectToTechnology"("B");

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobOfferId_fkey" FOREIGN KEY ("jobOfferId") REFERENCES "job_offers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "technologies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
