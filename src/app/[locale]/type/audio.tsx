import { Howl } from 'howler';

export const audios = {
  click: new Howl({ src: ['/audio/click.wav'], html5: true }),
  wrong: new Howl({ src: ['/audio/wrong.wav'], html5: true }),
  backspace: new Howl({ src: ['/audio/backspace.wav'], html5: true }),
  restart: new Howl({ src: ['/audio/restart.wav'], html5: true }),
};
