export function listeningCard(): string {
  return `
    <div class="card card-border bg-base-100 w-full">
      <div class="p-[15px] flex flex-col gap-[15px]">
        <p class="text-[14px] font-extrabold tracking-[0.28px]">LISTENING TO</p>
        <iframe width="100%" height="400" src="https://player-widget.mixcloud.com/widget/iframe/?light=1&feed=%2Fammonhaggerty%2Frhythm-society-lucky-13%2F" frameborder="0" allow="encrypted-media; fullscreen; autoplay; idle-detection; speaker-selection; web-share;" class="rounded-[5px]"></iframe>
        <p class="text-[14px]">Listen to more mixes on <a href="https://mixcloud.com/ammonhaggerty" target="_blank" rel="noopener noreferrer" class="link">Mixcloud</a></p>
      </div>
    </div>`;
}
