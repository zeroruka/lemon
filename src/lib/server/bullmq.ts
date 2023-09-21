import { Queue } from 'bullmq';
import IORedis from 'ioredis';

export const connection = new IORedis({ maxRetriesPerRequest: null });

export const imageProcessingQueue = new Queue('image-processing', { connection });
