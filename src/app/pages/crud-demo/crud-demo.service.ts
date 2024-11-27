import { Injectable, signal } from '@angular/core';
import { MEDIA_DATA_LOAD } from './media-data';
import { MediaType } from './media-form';

export interface Media {
  id: string;
  type: MediaType;
  title: string;
  genre: string;
  imdbLink?: string;
  description?: string;
  consumed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CrudDemoService {
  public $media = signal<Media[]>(MEDIA_DATA_LOAD);

  public addMedia(media: Media) {
    const id = crypto.randomUUID();
    media.id = id;

    this.$media.update((value) => [...value, media]);
  }

  public removeMedia(id: string) {
    const currMedia = [...this.$media()];
    const filteredMedia = currMedia.filter((f) => f.id !== id);

    this.$media.set(filteredMedia);
  }

  public updateMedia(media: Media) {
    const currMedia = [...this.$media()];
    const index = currMedia.findIndex((f) => f.id === media.id);

    if (index > -1) {
      currMedia[index] = media;
      this.$media.set(currMedia);
    }
  }
}
