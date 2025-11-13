/*
  Warnings:

  - The primary key for the `audit_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `audit_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `audit_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentId` column on the `bookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `event_viewers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `event_viewers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoryId` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `file_uploads` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `file_uploads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uploadedById` column on the `file_uploads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `notifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `system_settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `system_settings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bookingId` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userId` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `eventId` on the `bookings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `event_viewers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizerId` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `eventId` on the `tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."audit_logs" DROP CONSTRAINT "audit_logs_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."bookings" DROP CONSTRAINT "bookings_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."event_viewers" DROP CONSTRAINT "event_viewers_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."events" DROP CONSTRAINT "events_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."events" DROP CONSTRAINT "events_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."file_uploads" DROP CONSTRAINT "file_uploads_uploadedById_fkey";

-- DropForeignKey
ALTER TABLE "public"."notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tickets" DROP CONSTRAINT "tickets_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tickets" DROP CONSTRAINT "tickets_eventId_fkey";

-- DropForeignKey
ALTER TABLE "public"."tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- AlterTable
ALTER TABLE "audit_logs" DROP CONSTRAINT "audit_logs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL,
DROP COLUMN "paymentId",
ADD COLUMN     "paymentId" INTEGER,
ADD CONSTRAINT "bookings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "event_viewers" DROP CONSTRAINT "event_viewers_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL,
ADD CONSTRAINT "event_viewers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "events" DROP CONSTRAINT "events_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "organizerId",
ADD COLUMN     "organizerId" INTEGER NOT NULL,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER,
ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "file_uploads" DROP CONSTRAINT "file_uploads_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "uploadedById",
ADD COLUMN     "uploadedById" INTEGER,
ADD CONSTRAINT "file_uploads_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "system_settings" DROP CONSTRAINT "system_settings_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "eventId",
ADD COLUMN     "eventId" INTEGER NOT NULL,
DROP COLUMN "bookingId",
ADD COLUMN     "bookingId" INTEGER,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_paymentId_key" ON "bookings"("paymentId");

-- CreateIndex
CREATE INDEX "bookings_userId_idx" ON "bookings"("userId");

-- CreateIndex
CREATE INDEX "bookings_eventId_idx" ON "bookings"("eventId");

-- CreateIndex
CREATE INDEX "bookings_paymentId_idx" ON "bookings"("paymentId");

-- CreateIndex
CREATE INDEX "event_viewers_eventId_idx" ON "event_viewers"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "event_viewers_eventId_socketId_key" ON "event_viewers"("eventId", "socketId");

-- CreateIndex
CREATE INDEX "events_organizerId_idx" ON "events"("organizerId");

-- CreateIndex
CREATE INDEX "events_categoryId_idx" ON "events"("categoryId");

-- CreateIndex
CREATE INDEX "file_uploads_uploadedById_idx" ON "file_uploads"("uploadedById");

-- CreateIndex
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "tickets_eventId_idx" ON "tickets"("eventId");

-- CreateIndex
CREATE INDEX "tickets_bookingId_idx" ON "tickets"("bookingId");

-- CreateIndex
CREATE INDEX "tickets_userId_idx" ON "tickets"("userId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_viewers" ADD CONSTRAINT "event_viewers_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_uploads" ADD CONSTRAINT "file_uploads_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
