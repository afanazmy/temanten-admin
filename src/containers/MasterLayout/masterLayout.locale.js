/**
 * Untuk language masing-masing module, nama variable nya diawali dengan `enUS` dan `idID`,
 * kemudian diikuti dengan nama module nya.
 *
 * Untuk key object nya diawali dengan nama module camel case,
 * kemudian selanjutnya diikuti dengan bahasa inggris dari katanya sama persis (Kapital, Spasi, Koma, Titik dll sama).
 *
 * Penamaan variable seperti ini bertujuan agar proses import di language entries nya lebih mudah.
 *
 * Penamaan object key seperti ini bertujuan agar lebih mudah dicari
 * dan dapat dengan mudah disesuaikan kapital atau tanda bacanya sesuai keperluan.
 * Akan tetapi ada kasus khusus, ketika language nya sangat panjang,
 * maka gunakan key yang se-deskriptif mungkin dan se-singkat mungkin.
 */

export const enUSMasterLayoutLocale = {
  'masterLayout.loading.title': 'Retrieving user data ...',
  'masterLayout.loading.description': 'Please wait, you will be redirected when everything is ready',
};

export const idIDMasterLayoutLocale = {
  'masterLayout.loading.title': 'Mengambil data pengguna ...',
  'masterLayout.loading.description': 'Mohon tunggu, Anda akan dialihkan ketika semuanya sudah siap',
};
