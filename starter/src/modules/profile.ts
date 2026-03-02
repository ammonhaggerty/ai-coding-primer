// Weather condition code to weather-icons class mapping
const weatherIconMap: Record<number, { day: string; night: string }> = {
  1000: { day: 'wi-day-sunny', night: 'wi-night-clear' },
  1003: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy' },
  1006: { day: 'wi-cloudy', night: 'wi-cloudy' },
  1009: { day: 'wi-cloudy', night: 'wi-cloudy' },
  1030: { day: 'wi-fog', night: 'wi-fog' },
  1063: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1066: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1069: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1072: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1087: { day: 'wi-day-thunderstorm', night: 'wi-night-alt-thunderstorm' },
  1114: { day: 'wi-snow-wind', night: 'wi-snow-wind' },
  1117: { day: 'wi-snow-wind', night: 'wi-snow-wind' },
  1135: { day: 'wi-fog', night: 'wi-fog' },
  1147: { day: 'wi-fog', night: 'wi-fog' },
  1150: { day: 'wi-day-sprinkle', night: 'wi-night-alt-sprinkle' },
  1153: { day: 'wi-day-sprinkle', night: 'wi-night-alt-sprinkle' },
  1168: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1171: { day: 'wi-sleet', night: 'wi-sleet' },
  1180: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1183: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1186: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  1189: { day: 'wi-rain', night: 'wi-rain' },
  1192: { day: 'wi-rain', night: 'wi-rain' },
  1195: { day: 'wi-rain', night: 'wi-rain' },
  1198: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  1201: { day: 'wi-rain-mix', night: 'wi-rain-mix' },
  1204: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1207: { day: 'wi-sleet', night: 'wi-sleet' },
  1210: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1213: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1216: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1219: { day: 'wi-snow', night: 'wi-snow' },
  1222: { day: 'wi-snow', night: 'wi-snow' },
  1225: { day: 'wi-snow', night: 'wi-snow' },
  1237: { day: 'wi-hail', night: 'wi-hail' },
  1240: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1243: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1246: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  1249: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  1252: { day: 'wi-sleet', night: 'wi-sleet' },
  1255: { day: 'wi-day-snow', night: 'wi-night-alt-snow' },
  1258: { day: 'wi-snow', night: 'wi-snow' },
  1261: { day: 'wi-hail', night: 'wi-hail' },
  1264: { day: 'wi-hail', night: 'wi-hail' },
  1273: { day: 'wi-day-thunderstorm', night: 'wi-night-alt-thunderstorm' },
  1276: { day: 'wi-thunderstorm', night: 'wi-thunderstorm' },
  1279: { day: 'wi-day-snow-thunderstorm', night: 'wi-night-alt-snow-thunderstorm' },
  1282: { day: 'wi-snow-thunderstorm', night: 'wi-snow-thunderstorm' },
};

function getWeatherIcon(code: number, isDay: boolean): string {
  const entry = weatherIconMap[code];
  if (!entry) return 'wi-na';
  return isDay ? entry.day : entry.night;
}

interface WeatherData {
  tempF: number;
  conditionCode: number;
  isDay: boolean;
  maxTempF: number;
  minTempF: number;
  sunrise: string;
  sunset: string;
}

export async function fetchWeather(apiKey: string, location: string): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=1`
    );
    if (!res.ok) return null;
    const data = await res.json() as any;
    return {
      tempF: Math.round(data.current.temp_f),
      conditionCode: data.current.condition.code,
      isDay: data.current.is_day === 1,
      maxTempF: Math.round(data.forecast.forecastday[0].day.maxtemp_f),
      minTempF: Math.round(data.forecast.forecastday[0].day.mintemp_f),
      sunrise: data.forecast.forecastday[0].astro.sunrise,
      sunset: data.forecast.forecastday[0].astro.sunset,
    };
  } catch {
    return null;
  }
}

// Format "06:02 AM" -> "6:02a"
function formatTime(time: string): string {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return time;
  const hour = parseInt(match[1], 10);
  const min = match[2];
  const period = match[3].toLowerCase().charAt(0);
  return `${hour}:${min}${period}`;
}

export function profileCard(name: string, location: string, weather: WeatherData | null): string {
  const weatherHtml = weather ? `
          <div class="flex gap-5 items-end mt-1">
            <div class="flex items-end gap-1">
              <i class="wi ${getWeatherIcon(weather.conditionCode, weather.isDay)} text-3xl text-base-content/50"></i>
              <span class="text-xl font-medium">${weather.tempF}&deg;F</span>
            </div>
            <div class="flex flex-col text-xs text-base-content/70">
              <span class="text-sm">&nbsp;</span>
              <span><span class="font-bold text-base-content/40">&darr;</span>${weather.minTempF} <span class="text-base-content/20">|</span> <span class="font-bold text-base-content/40">&uarr;</span>${weather.maxTempF}</span>
            </div>
            <div class="flex flex-col items-center text-xs text-base-content/60 pb-0.5">
              <i class="wi wi-sunrise text-base-content text-base"></i>
              <span>${formatTime(weather.sunrise)}</span>
            </div>
            <div class="flex flex-col items-center text-xs text-base-content/60 pb-0.5">
              <i class="wi wi-sunset text-base-content text-base"></i>
              <span>${formatTime(weather.sunset)}</span>
            </div>
          </div>` : '';

  return `
    <div class="bg-base-100 rounded-xl border border-base-300 flex gap-5 items-center p-4 w-full">
      <div class="w-[82px] h-[82px] rounded-full border border-base-300 bg-base-200 flex-shrink-0 overflow-hidden">
        <img src="https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}" alt="avatar" class="w-full h-full object-cover" />
      </div>
      <div class="flex flex-col gap-1.5 min-w-0 flex-1">
        <p class="text-lg font-medium tracking-wide">I'm ${escapeHtml(name)}</p>
        <div class="flex gap-1.5 items-center text-base-content/70">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <span class="text-sm">${escapeHtml(location)}</span>
        </div>
        ${weatherHtml}
      </div>
    </div>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
