import {Palette} from "lucide-react";
import React, {useCallback, useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";
import getCroppedImg from "@/utils/crop-image";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

interface Props {
    image: string | null;
    getCroppedImage: (img: string) => void;
}

export default function ImageUploadCropped({image, getCroppedImage}: Props) {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [finalImage, setFinalImage] = useState<string | null>(image);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        getCroppedImage(croppedImage);
        setFinalImage(croppedImage);
        setImageSrc(null);
    };

    return (
        <div>
            {finalImage ? (
                <div>
                    <img src={finalImage} alt="Cropped" className="w-48 h-48 object-cover rounded-xl"/>
                </div>
            ) : (
                <div
                    className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                        <Palette className="mx-auto h-10 w-10 text-gray-400"/>
                        <div className="mt-2">
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                            >
                                <span>Upload</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept=".jpg,.jpeg,.png,.pdf,.gg"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">JPG, PNG, PDF, GG up to 1,012 MB</p>
                    </div>
                </div>
            )}
            <Dialog open={!!imageSrc} onOpenChange={() => setImageSrc(null)}>
                <VisuallyHidden>
                    <DialogTitle>Crop dialog</DialogTitle>
                </VisuallyHidden>
                <DialogContent className="max-w-2xl p-6">
                    {imageSrc && (
                        <div className="relative w-full h-[400px] bg-muted rounded-md overflow-hidden">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <label className="text-sm mb-1 block">Zoom</label>
                        <Slider
                            min={1}
                            max={3}
                            step={0.1}
                            value={[zoom]}
                            onValueChange={([val]) => setZoom(val)}
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button variant="outline" onClick={() => setImageSrc(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCrop}>Crop</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}