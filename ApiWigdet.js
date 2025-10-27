const btnapi = document.querySelector("#btnapiget");
const valapicity = document.querySelector("#ApiValue");
const widget = document.querySelector("#ApiWigdetWeather");
const btndrk = document.querySelector("#btndark");

let jsondata = {};
fetch("weatherData.json") // Api ile dizinde bulunan dosya içerigi okuma
  .then((res) => res.json())
  .then((data) => {
    jsondata = data;
  })
  .catch((ee) => alert("Dosya Okunurken Hata Oluştu: " + ee.message));

document.addEventListener("DOMContentLoaded", valcontrol);
valapicity.addEventListener("keyup", valcontrol);
btnapi.addEventListener("click", ApiGetWeatherControl);
btndrk.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
valapicity.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    ApiGetWeatherControl();
  }
  if (e.key === "Escape") {
    valapicity.value = "";
  }
  if (e.key === "Home") {
    navigator.clipboard.writeText(valapicity.value.trim());
  }
});
function valcontrol() {
  const val = valapicity.value.trim();
  if (val === "") {
    btnapi.disabled = true;
  } else {
    btnapi.disabled = false;
  }
}

function ApiGetWeatherControl() {
  const val = valapicity.value.trim().toLowerCase();
  if (val === "") {
    alert("Lütfen Bir Şehir Adı Giriniz.");
    return;
  }

  try {
    const cityEntry = Object.values(jsondata).find(
      (c) => c.name.toLowerCase() === val
    );

    if (!cityEntry) {
      alert(
        `${val} Şehrine Ait Herhangi Bir Hava Durumu Kaydı Bulunmamaktadır.`
      );
      return;
    }

    const citykey = cityEntry.geoObjectKey;

    const srcnew = `https://api.wo-cloud.com/content/widget/?geoObjectKey=${citykey}&language=tr&region=TR&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius`;

    widget.src = srcnew;
  } catch (err) {
    alert(
      `Hava Durumu Bilgisi Çekilirken Hata Oluştu. Hata Mesajı: ${err.message}`
    );
  }
}
