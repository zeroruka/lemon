import { prisma } from '$lib/server/prisma';
import { SizeVariantType } from '@prisma/client';
import { Worker } from 'bullmq';
import mimeTypes from 'mime-types';
import sharp from 'sharp';
import { connection } from '../bullmq';

console.log('Starting image processing worker');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const worker = new Worker(
	'image-processing',
	async (job) => {
		console.log('Processing image');

		const { newPhoto } = job.data;
		const { id, hash, mime, user_id } = newPhoto;
		const extension = mimeTypes.extension(mime);
		const originalPath = `images/${user_id}/${hash}.${extension}`;

		// Define the sizes for the variants
		const sizes = {
			MEDIUM2X: { width: 1000 },
			MEDIUM: { width: 500 },
			SMALL2X: { width: 400 },
			SMALL: { width: 200 },
			THUMB2X: { width: 160 },
			THUMB: { width: 80 }
		};

		// check if the original image exists
		while (!(await sharp(originalPath).metadata())) {
			console.log('Waiting for original image to be written to disk');
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		// Process each variant
		for (const [type, size] of Object.entries(sizes)) {
			const variantPath = `images/${user_id}/${hash}_${type}.${extension}`;

			try {
				// Resize the image
				const image = sharp(originalPath).resize(size.width);
				const info = await image.toFile(variantPath);
				console.log(`Processed image variant ${type}`);
				// Add the variant to the database
				await prisma.sizeVariant.create({
					data: {
						type: SizeVariantType[type as keyof typeof SizeVariantType],
						path: variantPath,
						url: `/${user_id}/${hash}_${type}.${extension}`,
						width: info.width,
						height: info.height,
						file_size: info.size,
						photo: {
							connect: {
								id: id
							}
						}
					}
				});
			} catch (error) {
				console.error(`Error processing image variant ${type}:`, error);
			}
		}

		return true;
	},
	{ connection }
);
