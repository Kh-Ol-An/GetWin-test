export interface IName {
    name: string;
}

export interface IType {
    type: IName;
}

interface IMove {
    move: IName;
}

interface ISprites {
    front_default: string;
    other: {
        dream_world: {
            front_default: string;
        };
    };
}

export interface IDetailPokemon extends IName {
    id: number;
    sprites: ISprites;
    moves: IMove[];
    types: IType[];
}

export interface IPokemonByType {
    pokemon: IName;
}

export interface IPokemonPage {
    count?: number;
    results: IName[];
}

export interface IGetPokemonListParams {
    offset: number;
    limit: number;
}
