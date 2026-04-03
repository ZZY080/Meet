export interface Note {
  id: string;
  cover: {
    url: string;
    width: number;
    height: number;
  };
  brand: string;
  title: string;
  price: number;
  type: string;
  user: {
    user_id: string;
    avatar: string;
    name: string;
  };
  likes: number;
  isLiked: boolean;
  sold: number;
}

export interface NoteDetail {}
