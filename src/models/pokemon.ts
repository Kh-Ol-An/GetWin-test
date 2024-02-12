interface IType {
    type: {
        name: string;
    };
}

interface IMove {
    move: {
        name: string;
    };
}

interface ISprites {
    front_default: string;
    other: {
        dream_world: {
            front_default: string;
        };
    };
}

export interface IDetailPokemon {
    id: number;
    name: string;
    sprites: ISprites;
    moves: IMove[];
    types: IType[];
}

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

export interface IGetPokemonListParams {
    offset: number;
    limit: number;
}
