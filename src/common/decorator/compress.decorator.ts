import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { extname } from "path";
import sharp, { FormatEnum } from "sharp";

export const CompressedFile = createParamDecorator(
    async (
        option: { width: number, quality: number, compressionLevel: number } = { width: null, quality: 80, compressionLevel: 8 },
        context: ExecutionContext
    ) => {
        const request = context.switchToHttp().getRequest();
        const file: Express.Multer.File = request.file;

        if (!file || !file.path || !file.mimetype.startsWith('image/')) {
            return file;
        }

        const extension = extname(file.originalname).replace('.', '');

        try {
            const image = await sharp(file.path)
            const metadata = await image.metadata();
            const oversized = metadata.width > 1080;
            if (oversized || option.width) {
                image.resize(oversized ? 1080 : option.width);
            }
            const buffer = await image.toFormat(extension as keyof FormatEnum, {
                quality: option.quality,
                compressionLevel: option.compressionLevel
            }).toBuffer();
            await sharp(buffer).toFile(file.path);
        } catch (error) {
            throw new InternalServerErrorException();
        }

        return file;
    }
);