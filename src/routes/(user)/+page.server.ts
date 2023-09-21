import { imageProcessingQueue } from '$lib/server/bullmq.js';
import { prisma } from '$lib/server/prisma';
import { SizeVariantType } from '@prisma/client';
import exif from 'exif-reader';
import { fileTypeFromBuffer } from 'file-type';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

export const actions = {
	uploadFiles: async ({ request, locals }) => {
		const form = await request.formData();
		const files = form.getAll('files[]');

		if (files.length === 0) {
			return { status: 400, body: { message: 'No files were uploaded.' } };
		}

		files.forEach(async (file) => {
			if (!(file instanceof File)) {
				return { status: 400, body: { message: 'Invalid file.' } };
			}

			const user_id = locals.user.id;
			const fileBuffer = new Uint8Array(await file.arrayBuffer());
			const type = await fileTypeFromBuffer(fileBuffer);

			if (!type) {
				return { status: 400, body: { message: 'Invalid file type.' } };
			}

			const hash = createHash('sha256').update(fileBuffer).digest('hex');
			const filePath = `images/${user_id}/${hash}.${type.ext}`;

			// Validate file path to make sure there are no illegal characters
			if (!filePath.match(/^[a-zA-Z0-9_\-/.]+$/)) {
				return { status: 400, body: { message: 'Invalid file path.' } };
			}

			// Make sure the directory exists
			await mkdir(`images/${user_id}`, { recursive: true });

			try {
				await writeFile(filePath, new Uint8Array(await file.arrayBuffer()));

				const image = sharp(fileBuffer);
				const metadata = await image.metadata();
				const exifData = metadata.exif ? exif(metadata.exif) : undefined;

				const newPhoto = await prisma.photo.create({
					data: {
						title: file.name,
						hash: hash,
						mime: type.mime,
						exif: exifData,
						user: {
							connect: {
								id: locals.user.id
							}
						},
						size_variants: {
							create: [
								{
									type: SizeVariantType.ORIGINAL,
									path: filePath,
									url: `/${user_id}/${hash}.${type.ext}`,
									width: metadata.width,
									height: metadata.height,
									file_size: metadata.size
								}
							]
						}
					}
				});

				await imageProcessingQueue.add('image-processing', { newPhoto });
			} catch (error) {
				console.log(error);
			}
		});
	}
};
