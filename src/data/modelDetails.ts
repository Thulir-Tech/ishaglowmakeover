export interface ModelShoot {
  id: string;
  modelName: string;
  imagesPathID?: number;
  instagramHandle?: string;
  verifiedInstagram?: boolean;
  photographer: string;
  photographerInsta?: string;
  coverImage: string;
  images: string[];
}

const modelImagesPath = '/images/models/';

export const modelShoots: ModelShoot[] = [
  {
    id: "divya-hashini",
    modelName: "Divya Hashini",
    imagesPathID : 1,
    instagramHandle: "divya_hashini_",
    verifiedInstagram: true,
    photographer: "RP Wedding Media",
    photographerInsta: "rp_wedding_media",
    coverImage:
      modelImagesPath + "1/10.heic",
    images: [
      modelImagesPath + "1/1.heic",
        modelImagesPath + "1/2.heic",
        modelImagesPath + "1/3.heic",
        modelImagesPath + "1/4.heic",
        modelImagesPath + "1/5.heic",
        modelImagesPath + "1/6.heic",
        modelImagesPath + "1/7.heic",
        modelImagesPath + "1/8.heic",
        modelImagesPath + "1/9.heic",
        modelImagesPath + "1/10.heic",
        modelImagesPath + "1/11.heic",
    ],
  },
];
