import { findTopicById } from "@/repositories/topic.repository";

export async function getTopicById(id: string) {
    return findTopicById(id);
}
