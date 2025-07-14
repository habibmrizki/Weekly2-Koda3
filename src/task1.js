// Definisi fungsi fetchData: Mengembalikan sebuah Promise.
// Fungsi ini mensimulasikan operasi asinkron, seperti mengambil data dari server.
const fetchData = (status) => {
  // Promise: Sebuah objek yang merepresentasikan hasil akhir dari sebuah operasi asinkron.
  return new Promise((resolve, reject) => {
    if (status) {
      // setTimeout: Digunakan untuk mensimulasikan penundaan (delay) dalam operasi asinkron.
      setTimeout(() => {
        // resolve(): Dipanggil ketika operasi asinkron berhasil.
        // Nilai yang dilewatkan ke resolve() akan menjadi nilai yang diterima oleh .then().
        resolve("Data berhasil mengambil");
      }, 3000); // Penundaan 3 detik.
    } else {
      // reject(): Dipanggil ketika operasi asinkron gagal.
      // Nilai yang dilewatkan ke reject() akan menjadi nilai yang diterima oleh .catch().
      reject("Gagal mengambil data");
    }
  });
};

export const runTask1 = async () => {
  // Menggunakan .then().catch() untuk penanganan Promise
  // Memanggil fetchData dengan status 'true' (simulasi sukses).
  fetchData(true)
    .then((response) => {
      // .then(): Callback ini akan dieksekusi jika Promise 'fetchData(true)' berhasil (resolve).
      // 'response' akan berisi nilai yang dilewatkan ke 'resolve()', yaitu "Data berhasil mengambil".
      console.log("Skenario then-catch (sukses):", response);
    })
    .catch((err) => {
      // .catch(): Callback ini akan dieksekusi jika Promise 'fetchData(true)' gagal (reject).
      // 'err' akan berisi nilai yang dilewatkan ke 'reject()'.
      console.log("Skenario then-catch (gagal):", err);
    });

  // Menggunakan async/await dan try-catch untuk penanganan Promise
  // Membuat kode asinkron terlihat seperti kode sinkron.

  // Fungsi ini akan menjalankan operasi pengambilan data menggunakan async/await.
  const getData = async () => {
    try {
      console.log("\n--- Skenario async/await (berhasil) ---");
      // try: Blok kode ini akan dicoba dieksekusi.
      // Jika ada error (misalnya, Promise di-reject), eksekusi akan melompat ke blok 'catch'.
      // await: Operator ini hanya bisa digunakan di dalam fungsi 'async'.
      // 'await' akan 'menunggu' Promise 'fetchData(true)' selesai (resolve atau reject).
      // Jika Promise resolve, nilai yang di-resolve akan diberikan ke variabel 'result'.
      // Jika Promise reject, 'await' akan "melemparkan" (throw) error tersebut,
      // yang kemudian akan ditangkap oleh blok 'catch'.
      const result = await fetchData(true); // Memanggil fetchData dengan status 'true' (simulasi sukses).
      console.log("Skenario async/await (sukses):", result);
    } catch (err) {
      // catch: Blok ini akan dieksekusi jika ada error (exception) yang terjadi
      // di dalam blok 'try'.
      console.log("Skenario async/await (gagal):", err.message);
    }
  };

  // await getData(): Memastikan bahwa fungsi 'getData()' (yang juga asinkron) selesai
  // dieksekusi sebelum 'runTask1' selesai.
  await getData();

  // Untuk menunjukkan contoh 'async/await' yang gagal:
  console.log("\n--- Skenario async/await (gagal) ---");
  try {
    const failedResult = await fetchData(false); // Memanggil fetchData dengan status 'false'.
    console.log(
      "Skenario async/await (sukses - tidak akan tercetak):",
      failedResult
    );
  } catch (err) {
    console.log("Skenario async/await (gagal):", err); // Akan mencetak "Gagal mengambil data"
  }
};
