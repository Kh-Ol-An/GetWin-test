export interface IPokemon {
    name: string;
    url: string;
}

export interface IPokemonPage {
    count: number;
    next: string;
    previous: string;
    results: IPokemon[];
}
