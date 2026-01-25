export function timeToSlot(hour: number, minute:number){
    return Math.floor((hour * 60 + minute) / 10);
}; 

export function slotToLabel(slot: number) {
    const totalMinutes = slot * 10;
    const hour = Math.floor(totalMinutes / 60).toString().padStart(2, "0");
    const minute = (totalMinutes % 60).toString().padStart(2, "0")
    return `${hour}:${minute}`;
};

export const ALL_SLOTS = Array.from({ length: 145 }, (_,i) => i);

export function generateTimeOptions() {
  const options : { value : number, label: string }[] = [];
  for(let slot = 0; slot <= 144; slot += 3){
    options.push({
      value: slot,
      label: slotToLabel(slot)
    });
  }
  return options;
};