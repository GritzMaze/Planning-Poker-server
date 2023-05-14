/*
  Warnings:

  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mindmap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_source_node_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_target_node_id_fkey";

-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_mindmap_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_parent_id_fkey";

-- DropTable
DROP TABLE "Connection";

-- DropTable
DROP TABLE "Mindmap";

-- DropTable
DROP TABLE "Node";
