
// remove all space and special characters before and after from a string
export const StringCleaner = (input: string) => {
    return input.trim();
}

//remove all characters between parentheses
export const RinkNameCleaner = (name: string) => {
    return StringCleaner(name.replace(/\(.*?\)/g, ''));
}