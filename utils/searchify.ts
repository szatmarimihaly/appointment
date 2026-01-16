

export function searchify(text: string) : string{
    return text.toLocaleLowerCase().replace(/[^a-z0-9]/g, '').trim();
}