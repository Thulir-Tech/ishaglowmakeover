export interface BabyShowerAlbum {
  id: string;
  title: string;
  momName: string;
  location: string;
  description: string;
  coverImage?: string;
  images: string[];
}

const babyShowerImagesPath = '/images/babyShower/';

export const babyShowerAlbums: BabyShowerAlbum[] = [
  {
    id: "sowmya-seemantham",
    title: "Sowmya's Seemantham",
    momName: "Sowmya",
    location: "Vallioor",
    description:
      "Natural, dewy makeup focusing on the pregnancy glow with traditional saree draping and flower adornments.",
    coverImage: babyShowerImagesPath + "1/4.jpg",
    images: [
        babyShowerImagesPath + "1/4.jpg",
        babyShowerImagesPath + "1/1.jpg",
        babyShowerImagesPath + "1/2.jpg",
        babyShowerImagesPath + "1/3.jpg",
        babyShowerImagesPath + "1/5.jpg"
    ],
  },

  {
    id: "shilpa-seemantham",
    title: "Shilpa's Baby Shower",
    momName: "Shilpa Mani",
    location: "Tenkasi",
    description:
      "A classy makeup look enhancing the natural beauty of the mom-to-be, paired with red gown and elegant accessories.",
    coverImage: babyShowerImagesPath + "2/1.webp",
    images: [
      babyShowerImagesPath + "2/1.webp",
      babyShowerImagesPath + "2/2.webp",
      babyShowerImagesPath + "2/3.webp"
    ],
  },
];
