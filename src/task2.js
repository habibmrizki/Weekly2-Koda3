const getDataFromServer = (status, callback) => {
  if (status) {
    setTimeout(() => {
      const product = ["product 1", "product 2", "product 3"];
      callback(product, null);
    }, 3000);
  } else {
    const err = new Error("Failed to fetch data");
    callback(null, err);
  }
};

function processData(status) {
  return new Promise((resolve, reject) => {
    getDataFromServer(status, (data, error) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export const runTask2 = async () => {
  try {
    const data = await processData(true);
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        console.table(`${index + 1}. ${item}`);
      });
    } else {
      console.log("Tidak ada produk ditemukan atau format data tidak sesuai.");
    }
  } catch (error) {
    console.log(error.message);
  }
};
