export interface Media {
  src: string;
  alt: string;
}

export interface Lecturer {
  name: string;
  avatar: Media;
}

export interface FullstackEvent {
  slug: string;
  title: any;
  date: Date;
  thumbnail: Media;
  subscribersCount?: number;
  lecturers: Lecturer[];
}
