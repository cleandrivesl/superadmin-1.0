export function Brand({compact=false}:{compact?:boolean}) {
  return (
    <div className="flex items-center gap-3">
      <img src="/cleandrive-mark.svg" alt="CleanDrive" className={compact ? "h-7 w-7 rounded-lg" : "h-8 w-8 rounded-lg"} />
      {!compact && <img src="/cleandrive-wordmark.svg" alt="CleanDrive" className="h-6 hidden md:block" />}
    </div>
  );
}
