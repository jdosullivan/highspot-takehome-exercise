export const truncate = (input: string, maxLength: number) => (input && input.length > maxLength ? `${input.substring(0, maxLength)}...` : input);
