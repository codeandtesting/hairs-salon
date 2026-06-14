// Admin-panel-only translations. Russian is the default; Norwegian is available
// via the in-panel RU/NO toggle. This never touches the public site, so it has
// no SEO impact (the admin page is noindex and blocked in robots.txt anyway).

import type { GallerySize } from '@/data/types';

export type Lang = 'ru' | 'no';

export const LANG_COOKIE = 'admin_lang';

export interface AdminDict {
  adminTag: string;
  loginSubtitle: string;
  passwordPlaceholder: string;
  login: string;
  loggingIn: string;
  viewSite: string;
  save: string;
  saving: string;
  logout: string;
  tabServices: string;
  tabGallery: string;
  addTreatment: string;
  fieldName: string;
  fieldPrice: string;
  fieldSub: string;
  fieldDesc: string;
  deleteTreatment: string;
  galleryTitle: string;
  upload: string;
  uploading: string;
  galleryHint: string;
  fieldLabel: string;
  fieldSize: string;
  fieldColumn: string;
  deleteImage: string;
  saved: string;
  uploadedRemember: string;
  sizes: Record<GallerySize, string>;
  errors: Record<string, string>;
}

export const translations: Record<Lang, AdminDict> = {
  ru: {
    adminTag: 'Админ',
    loginSubtitle: 'Панель управления',
    passwordPlaceholder: 'Пароль',
    login: 'ВОЙТИ',
    loggingIn: 'ВХОД…',
    viewSite: 'ОТКРЫТЬ САЙТ',
    save: 'СОХРАНИТЬ',
    saving: 'СОХРАНЕНИЕ…',
    logout: 'ВЫЙТИ',
    tabServices: 'ЦЕНЫ И УСЛУГИ',
    tabGallery: 'ГАЛЕРЕЯ',
    addTreatment: '+ ДОБАВИТЬ УСЛУГУ',
    fieldName: 'Название',
    fieldPrice: 'Цена',
    fieldSub: 'Подкатегория',
    fieldDesc: 'Описание',
    deleteTreatment: 'Удалить услугу',
    galleryTitle: 'Изображения галереи',
    upload: '+ ЗАГРУЗИТЬ ФОТО',
    uploading: 'ЗАГРУЗКА…',
    galleryHint:
      'Колонка (1–3) определяет расположение. «Скрытый» означает, что фото показывается только в просмотрщике. Не забудьте сохранить.',
    fieldLabel: 'Подпись',
    fieldSize: 'Размер',
    fieldColumn: 'Колонка',
    deleteImage: 'Удалить фото',
    saved: 'Сохранено! Изменения опубликованы.',
    uploadedRemember: 'Фото загружено. Не забудьте сохранить.',
    sizes: { medium: 'средний', tall: 'высокий', small: 'маленький', hidden: 'скрытый' },
    errors: {
      generic: 'Что-то пошло не так. Попробуйте снова.',
      unauthorized: 'Не авторизовано.',
      wrong_password: 'Неверный пароль.',
      missing_password: 'На сервере не задан ADMIN_PASSWORD.',
      invalid_request: 'Неверный запрос.',
      invalid_json: 'Неверный JSON.',
      invalid_content: 'Недопустимое содержимое.',
      expected_form: 'Ожидались данные формы.',
      no_file: 'Файл не выбран.',
      file_too_large: 'Файл слишком большой (макс. 8 МБ).',
      invalid_file_type: 'Недопустимый тип файла.',
      save_failed: 'Не удалось сохранить.',
      upload_failed: 'Не удалось загрузить.',
    },
  },
  no: {
    adminTag: 'Admin',
    loginSubtitle: 'Administrasjon',
    passwordPlaceholder: 'Passord',
    login: 'LOGG INN',
    loggingIn: 'LOGGER INN…',
    viewSite: 'SE NETTSIDEN',
    save: 'LAGRE ENDRINGER',
    saving: 'LAGRER…',
    logout: 'LOGG UT',
    tabServices: 'PRISER & BEHANDLINGER',
    tabGallery: 'GALLERI',
    addTreatment: '+ LEGG TIL BEHANDLING',
    fieldName: 'Navn',
    fieldPrice: 'Pris',
    fieldSub: 'Underkategori',
    fieldDesc: 'Beskrivelse',
    deleteTreatment: 'Slett behandling',
    galleryTitle: 'Galleribilder',
    upload: '+ LAST OPP BILDE',
    uploading: 'LASTER OPP…',
    galleryHint:
      'Kolonne (1–3) bestemmer plassering. «Skjult» betyr at bildet kun vises i lyskassen. Husk å lagre.',
    fieldLabel: 'Etikett',
    fieldSize: 'Størrelse',
    fieldColumn: 'Kolonne',
    deleteImage: 'Slett bilde',
    saved: 'Lagret! Endringene er nå live.',
    uploadedRemember: 'Bilde lastet opp. Husk å lagre.',
    sizes: { medium: 'medium', tall: 'høy', small: 'liten', hidden: 'skjult' },
    errors: {
      generic: 'Noe gikk galt. Prøv igjen.',
      unauthorized: 'Ikke autorisert.',
      wrong_password: 'Feil passord.',
      missing_password: 'Serveren mangler ADMIN_PASSWORD.',
      invalid_request: 'Ugyldig forespørsel.',
      invalid_json: 'Ugyldig JSON.',
      invalid_content: 'Ugyldig innhold.',
      expected_form: 'Forventet skjemadata.',
      no_file: 'Ingen fil ble lastet opp.',
      file_too_large: 'Filen er for stor (maks 8 MB).',
      invalid_file_type: 'Ugyldig filtype.',
      save_failed: 'Lagring mislyktes.',
      upload_failed: 'Opplasting mislyktes.',
    },
  },
};

// Persist the language choice so it survives reloads (admin-only cookie).
export function persistLang(lang: Lang) {
  if (typeof document !== 'undefined') {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }
}
