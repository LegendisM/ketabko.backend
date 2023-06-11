import { v4 as uuidv4 } from "uuid";

export const generateFileName = (extension): string => {
    return `${uuidv4()}${Date.now()}${extension}`;
}