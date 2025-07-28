import { Area } from 'react-easy-crop';

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (err) => reject(err));
        img.src = url;
    });

export default async function getCroppedImg(imageSrc: string, crop: Area): Promise<string> {
    const image: HTMLImageElement = await createImage(imageSrc);
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return canvas.toDataURL('image/jpeg');
}