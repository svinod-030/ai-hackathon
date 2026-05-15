-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "skills" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT,
    "content" TEXT NOT NULL,
    "skills" JSONB,
    "embeddingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "jdId" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);
